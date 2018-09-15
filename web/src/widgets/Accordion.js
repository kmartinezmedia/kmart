import React from 'react';
import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import * as Cmx from '../';
import zenscroll from 'zenscroll';

/*========================================
=            ACCORDION PARENT            =
========================================*/
export const Accordion = {};

Accordion.Group = class extends React.Component {
  items = [];
  state = { active: null };

  componentDidMount() {
    if (this.props.startExpanded) {
      this.changeActive(0);
    }
  }

  changeActive = index => {
    if (index === this.state.active) {
      this.setState({
        active: null,
      });
    } else if (this.state.active !== null) {
      this.setState({ active: index }, async () => {
        const activeAccordion = this.items[`accordion_${index}`];
        await Cmx.delay(200);
        if (!activeAccordion.isInViewport) {
          zenscroll.center(activeAccordion, 250);
        }
      });
    } else {
      this.setState({ active: index });
    }
  };

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            itemRef: el => (this.items[`accordion_${index}`] = el),
            active: this.state.active === index,
            isLast: this.props.children.length - 1 === index,
            onClick: this.changeActive,
            index: index,
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
  border-bottom: 1px solid
    ${p => (p.last ? 'transparent' : p.theme.colors[p.borderColor])};
  overflow: hidden;
`;

Accordion.Item = class extends React.Component {
  render() {
    const { borderColor = 'grey300', py = 2, px = 0, itemRef } = this.props;
    return (
      <StyledItem last={this.props.isLast} borderColor={borderColor}>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            itemRef: itemRef,
            active: this.props.active,
            onClick: this.props.onClick,
            index: this.props.index,
            px,
            py,
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
  cursor: pointer;
  transition: all 0.25s;
  user-select: none;
  ${StyledPlus1} {
    transform: ${p => p.active && 'translate3d(-50%, -50%, 0) rotate(90deg)'};
  }
`;

const StyledButton = Cmx.Button.extend`
  position: relative;
  width: ${p => p.theme.rems(p.buttonSize)};
  height: ${p => p.theme.rems(p.buttonSize)};
  padding: 0;
  flex-shrink: 0;
`;

Accordion.Title = class extends React.Component {
  render() {
    const {
      color = 'primary',
      buttonColor = 'primary',
      buttonSize = 48,
      bg = 'white',
      activeBg = 'white',
      index,
      active,
      onClick,
      px,
      py,
      children,
      itemRef,
    } = this.props;
    return (
      <StyledTitle
        innerRef={itemRef}
        active={active}
        onClick={() => onClick(index)}
        className="cmx-accordion"
        color={color}
        px={px}
        pt={py}
        pb={active ? 1 : py}
        bg={active ? activeBg : bg}
      >
        {children}
        <StyledButton circle bg={buttonColor} buttonSize={buttonSize}>
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
  opacity: ${p => (p.active ? '1' : '0')};
  transition: opacity 0.25s;
  padding-bottom: ${p => p.theme.rems(16)};
  sup {
    font-size: 0.6em;
    font-style: bold;
  }
`;

Accordion.Content = ({ active, px, bg = 'white', children }) => (
  <AnimateHeight duration={250} height={active ? 'auto' : 0}>
    <StyledContent active={active} px={px} bg={bg} width={1}>
      {children}
    </StyledContent>
  </AnimateHeight>
);
