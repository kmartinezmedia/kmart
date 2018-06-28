import React from "react";
import styled from "styled-components";

export const Text = styled.div`
  ${p => p.theme.setupComponent(p)};
`;

Text.defaultProps = {
  fontFamily: "default",
  m: 0
};

Text.displayName = "Text";

Text.hero = Text.withComponent("h1");
Text.hero.defaultProps = {
  fontFamily: "hero",
  fontSize: "hero",
  lineHeight: "hero",
  fontWeight: "semibold"
};

Text.h1 = Text.withComponent("h1").extend`
  z-index: 0;

  u {
    color: ${p => p.theme.colors.accent};
    text-decoration-color: ${p => p.theme.colors.accent};

    span {
      color: ${p => p.color || p.theme.colors.heading};
    }
  }
`;

Text.h1.defaultProps = {
  fontFamily: "h1",
  fontSize: "h1",
  lineHeight: "h1",
  fontWeight: "semibold",
  mb: 3
};

Text.h2 = Text.withComponent("h2");
Text.h2.defaultProps = {
  fontFamily: "h2",
  fontSize: "h2",
  lineHeight: "h2"
};

Text.h3 = Text.withComponent("h3");
Text.h3.defaultProps = {
  fontFamily: "h3",
  fontSize: "h3",
  lineHeight: "h3",
  fontWeight: "regular"
};

Text.h4 = Text.withComponent("h4");
Text.h4.defaultProps = {
  fontFamily: "h4",
  fontSize: "h4",
  lineHeight: "h4",
  fontWeight: "regular"
};

Text.h5 = Text.withComponent("h5");
Text.h5.defaultProps = {
  fontFamily: "h5",
  fontSize: "h5",
  lineHeight: "h5",
  color: "body",
  fontWeight: "light"
};

Text.span = Text.withComponent("span");

Text.p = Text.withComponent("p");
Text.p.defaultProps = {
  fontFamily: "p",
  fontSize: "p",
  lineHeight: "p",
  color: "body",
  fontWeight: "regular"
};

Text.small = Text.withComponent("small");
Text.small.defaultProps = {
  fontFamily: "p",
  fontSize: "small",
  lineHeight: "small",
  color: "body",
  fontWeight: "light"
};

export class Title extends React.Component {
  createText = (string, i) => {
    if (string === "Fertilome") {
      return (
        <u key={`${string}_${i}`}>
          <span className="register">{string}</span>{" "}
        </u>
      );
    } else {
      return (
        <u key={`${string}_${i}`}>
          <span>{string}</span>{" "}
        </u>
      );
    }
  };
  render() {
    const text = this.props.children.split(" ");
    return (
      <Text.h1 {...this.props}>
        {text.map((string, i) => this.createText(string, i))}
      </Text.h1>
    );
  }
}
