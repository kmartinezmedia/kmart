import React from "react";
import styled from "styled-components";
import * as Cmx from "../";

const CardContainer = styled(Cmx.Box)`
  border: 1px solid #ddd;
  border-radius: ${p => p.theme.defaultRadius};
  transition: box-shadow 0.25s;
  cursor: pointer;

  &:hover {
    ${p => p.theme.elevateFn(4)};
  }
`;

const Cover = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  border-radius: ${p => p.theme.defaultRadius};

  ${Cmx.BackgroundImage} {
    height: 100%;
    width: 100%;
    border-radius: ${p => p.theme.defaultRadius} ${p => p.theme.defaultRadius}
      0px 0px;
    background-size: cover;
  }
`;

const Details = styled.div`
    padding: 30px;
    ${p => p.theme.text.sans};
    border-radius: ${p => p.theme.defaultRadius} 0 ${p =>
  p.theme.defaultRadius} ${p => p.theme.defaultRadius};
    border-top: 1px solid #ddd;

    .title {
      font-size: 22px;
      ${p => p.theme.text.sans};
      line-height: 1.2em;
      padding-bottom: 10px;
    }

    .sub {
      ${p => p.theme.text.sans};
      ${p => p.theme.text.light};
      font-size: 14px;
    }
  }
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
      image,
      url,
      bgPosition,
      button,
      bgSize,
      imageParams
    } = this.props;

    return (
      <CardContainer onClick={() => this.goToSite(url)} {...this.props.styles}>
        <Cover innerRef={el => (this.image = el)}>
          <Cmx.BackgroundImage
            image={`${process.env.REACT_APP_IMGIX}/${image}?fit=crop&dpr=${
              window.devicePixelRatio
            }&q=60?h=200&w=200`}
          />
        </Cover>
        <Details>
          <div className="title">{title}</div>
          <div className="sub">{sub}</div>
          {button && button}
        </Details>
      </CardContainer>
    );
  }
}

Card.displayName = "Card";
