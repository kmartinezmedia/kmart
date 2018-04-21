import React from "react";
import AnimateHeight from "react-animate-height";
import styled from "styled-components";
import { space, theme } from "styled-system";
import * as Cmx from "../";

/*========================================
=            ACCORDION PARENT            =
========================================*/
export const Accordion = {};

Accordion.Group = class extends React.Component {
  state = { active: null };
  changeActive = index => {
    if (index === this.state.active) {
      this.setState({
        active: null
      });
    } else {
      this.setState({
        active: index
      });
    }
  };

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            active: this.state.active === index,
            isLast: this.props.children.length - 1 === index,
            onClick: this.changeActive,
            index: index
          });
        })}
      </div>
    );
  }
};

/*============================
=            ITEM            =
============================*/
const StyledItem = styled(Cmx.Box)`
  position: relative;
  border-bottom: 1px solid ${p => (p.last ? "transparent" : "#EFEFEF")};
  padding: ${p => p.theme.rems(12)} 0;
  overflow: hidden;
`;

Accordion.Item = class extends React.Component {
  render() {
    return (
      <StyledItem last={this.props.isLast}>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            active: this.props.active,
            onClick: this.props.onClick,
            index: this.props.index
          });
        })}
      </StyledItem>
    );
  }
};
/*=============================
=            TITLE            =
=============================*/
const StyledPlus = styled.div`
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition: transform ${p => p.theme.transitions.quick};
`;

const StyledPlus1 = styled(StyledPlus)`
  height: 14px;
  width: 2px;
`;

const StyledPlus2 = styled(StyledPlus)`
  height: 2px;
  width: 14px;
`;

const StyledTitle = styled(Cmx.Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${space};
  cursor: pointer;
  transition: all 0.25s;
  background-color: white;
  padding-bottom: ${p => (p.active ? p.theme.rems(8) : 0)};
  user-select: none;
  ${StyledPlus1} {
    transform: ${p => p.active && "translate3d(-50%, -50%, 0) rotate(90deg)"};
  }
`;

const StyledButton = Cmx.Button.extend`
  position: relative;
  width: ${p => p.theme.rems(48)};
  height: ${p => p.theme.rems(48)};
  padding: 0;
  flex-shrink: 0;
`;

Accordion.Title = class extends React.Component {
  render() {
    const { color = "primary", buttonColor = "primary" } = this.props;
    return (
      <StyledTitle
        active={this.props.active}
        onClick={() => this.props.onClick(this.props.index)}
        className="cmx-accordion"
        color={color}
        fontFamily="default"
        fontWeight="bold"
        fontSize="h5"
      >
        {this.props.children}
        <StyledButton circle bg={buttonColor}>
          <StyledPlus1 />
          <StyledPlus2 />
        </StyledButton>
      </StyledTitle>
    );
  }
};

/*===============================
=            CONTENT            =
===============================*/

const StyledContent = styled(Cmx.Box)`
  max-width: 90%;
  opacity: ${p => (p.active ? "1" : "0")};
  transition: opacity 0.25s;
  padding-bottom: ${p => p.theme.rems(16)};
`;

Accordion.Content = props => (
  <AnimateHeight duration={250} height={props.active ? "auto" : 0}>
    <StyledContent active={props.active}>
      <Cmx.Text.h5>{props.children}</Cmx.Text.h5>
    </StyledContent>
  </AnimateHeight>
);
