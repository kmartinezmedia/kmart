import React from "react";
import styled from "styled-components";
import * as Cmx from "../";

const CardContainer = styled(Cmx.Box)`
  border: 1px solid #ddd;
  border-radius: ${p => p.theme.defaultRadius};
  transition: opacity 0.25s;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Cover = styled(Cmx.Box)`
  width: 100%;
  position: relative;
  border-radius: ${p => p.theme.defaultRadius};

  ${Cmx.BackgroundImage} {
    border-radius: ${p => p.theme.defaultRadius} ${p => p.theme.defaultRadius}
      0px 0px;
  }
`;

const Details = styled(Cmx.Box)`
  border-radius: ${p => p.theme.defaultRadius} 0 ${p => p.theme.defaultRadius}
    ${p => p.theme.defaultRadius};
  border-top: 1px solid #ddd;
`;

export class Card extends React.Component {
  goToSite = url => {
    this.props.url && window.open(url, "_blank");
    this.props.onClick && this.props.onClick();
  };

  render() {
    const {
      title,
      sub,
      type,
      src,
      url,
      bgPosition,
      button,
      bgSize,
      imageParams,
      ...otherProps
    } = this.props;

    return (
      <CardContainer
        onClick={() => this.goToSite(url)}
        width={1}
        {...otherProps}
      >
        <Cover height={200}>
          <Cmx.BackgroundImage
            image={src}
            width={1}
            height={1}
            backgroundSize="cover"
          />
        </Cover>
        <Details p={3}>
          <Cmx.Text.h4
            fontFamily="sans"
            fontWeight="light"
            lineHeight="1.1"
            mb={1}
          >
            {title}
          </Cmx.Text.h4>
          <Cmx.Text.p fontFamily="sans" fontWeight="light">
            {sub}
          </Cmx.Text.p>
          {button && button}
        </Details>
      </CardContainer>
    );
  }
}

Card.displayName = "Card";
