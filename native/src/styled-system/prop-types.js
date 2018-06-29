'use strict';

var PropTypes = require('prop-types');

var responsive = PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]);

var responsiveBoolean = PropTypes.oneOfType([PropTypes.bool, PropTypes.array]);

var numberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

var width = {
  width: responsive,
  w: responsive
};

var space = {
  m: responsive,
  mt: responsive,
  mr: responsive,
  mb: responsive,
  ml: responsive,
  mx: responsive,
  my: responsive,
  p: responsive,
  pt: responsive,
  pr: responsive,
  pb: responsive,
  pl: responsive,
  px: responsive,
  py: responsive
};

var fontSize = {
  fontSize: responsive,
  f: responsive
};

var color = {
  color: responsive,
  bg: responsive
};

var textAlign = {
  align: responsive
};

var fontWeight = {
  fontWeight: numberOrString
};

var alignItems = {
  align: responsive
};

var justifyContent = {
  justify: responsive
};

var flexWrap = {
  wrap: responsiveBoolean
};

var flexDirection = {
  flexDirection: responsive
};

var flex = {
  flex: responsive
};

var alignSelf = {
  alignSelf: responsive
};

var borderRadius = {
  borderRadius: numberOrString
};

var borderWidth = {
  borderWidth: numberOrString,
  borderTop: PropTypes.bool,
  borderRight: PropTypes.bool,
  borderBottom: PropTypes.bool,
  borderLeft: PropTypes.bool
};

var borderColor = {
  borderColor: PropTypes.string
};

var boxShadow = {
  boxShadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

var hover = {
  hover: PropTypes.object
};

var focus = {
  focus: PropTypes.object
};

var active = {
  active: PropTypes.object
};

var disabled = {
  disabledStyle: PropTypes.object
};

var propTypes = {
  width: width,
  space: space,
  fontSize: fontSize,
  color: color,
  textAlign: textAlign,
  fontWeight: fontWeight,
  alignItems: alignItems,
  justifyContent: justifyContent,
  flexWrap: flexWrap,
  flexDirection: flexDirection,
  flex: flex,
  alignSelf: alignSelf,
  borderRadius: borderRadius,
  borderWidth: borderWidth,
  borderColor: borderColor,
  boxShadow: boxShadow,
  hover: hover,
  focus: focus,
  active: active,
  disabled: disabled
};

module.exports = propTypes;