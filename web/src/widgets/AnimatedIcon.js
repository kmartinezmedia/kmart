import React from "react";
import styled from "styled-components";

const LottieIcon = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${p => (p.playing ? 1 : 0)};
  transition: opacity ${p => p.theme.transitions.default};
`;

export class AnimatedIcon extends React.Component {
  state = { playing: false };

  componentDidMount() {
    const bodymovin = window.bodymovin;

    this.animation = bodymovin.loadAnimation({
      container: this.icon,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: this.props.path
    });

    this.animation.setSpeed(this.props.speed || 1);

    this.animation.addEventListener("complete", this.animationComplete);
  }

  play = () => {
    this.animation.goToAndPlay(0);
    this.setState({ playing: true });
  };

  animationComplete = () => {
    this.setState({ playing: false });
    this.props.onComplete();
  };

  render() {
    return (
      <LottieIcon
        innerRef={div => (this.icon = div)}
        preserveAspectRatio="xMidYMid slice"
        playing={this.state.playing}
      />
    );
  }
}
