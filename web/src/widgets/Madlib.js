import React from "react";
import styled from "styled-components";
import AnimateHeight from "react-animate-height";
import * as Cmx from "../";

const Container = styled(Cmx.Box)`
  position: relative;
  height: 0;
  padding-bottom: ${p => p.height};
  width: 100%;
  transition: padding-bottom ${p => p.theme.transitions.default};
`;

export class MadlibQuestions extends React.Component {
  questions = [];
  render() {
    // start question counter at 1
    let questionNumber = 1;

    return (
      <Container
        height={
          this.questions.length > 0
            ? `${this.questions[this.props.active].div.offsetHeight}px`
            : "65px"
        }
        style={{ position: "relative", width: "100%" }}
      >
        {React.Children.map(this.props.children, (child, index) => {
          if (child.type.displayName == "MadlibQuestion") {
            // increment question counter
            const number = questionNumber++;

            return React.cloneElement(child, {
              number: number,
              active: this.props.active,
              onClick: () => this.props.questionClicked(number),
              ref: el => (this.questions[index] = el)
            });
          } else if (child != null) {
            return React.cloneElement(child, {
              numberOfQuestions: questionNumber
            });
          }
        })}
      </Container>
    );
  }
}

const Question = styled(Cmx.Box)`
  position: absolute;
  width: 100%;
  cursor: pointer;
  user-select: none;
  transform-origin: left top;
  transition: transform 0.35s, opacity 0.35s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export class MadlibQuestion extends React.Component {
  render() {
    const { active, number, onClick } = this.props;

    const offset = active - number;
    const inactive = offset < 0;
    const completed = offset > 0;

    // decrease each completed question by 0.25 opacity
    const opacity = 1 - offset / 4;
    // decrease each completed question by 0.25 scale
    const scale = 1 - offset / 4;
    // move each completed question up extra 60px
    const yTranslation = offset * -60;

    const questionStyle = {
      // if question is active set opacity to 1
      // if its completed decrease opacity by amount above
      // if its inactive question set opacity to 0
      opacity: (active == number && 1) || completed ? `${opacity}` : 0,
      // if its completed use translation and scale above
      // its its active or inactive start with default scale and y position
      transform: completed
        ? `translateY( ${yTranslation}px ) scale( ${scale} )`
        : "translateY(0) scale(1)",
      // if its inactive question ignore click events
      pointerEvents: inactive && "none"
    };

    return (
      <Question
        style={questionStyle}
        onClick={onClick}
        innerRef={el => (this.div = el)}
      >
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            number: number,
            active: active
          });
        })}
      </Question>
    );
  }
}

MadlibQuestion.displayName = "MadlibQuestion";
