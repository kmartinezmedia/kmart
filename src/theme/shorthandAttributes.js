import {
  space,
  color,
  width,
  boxShadow,
  responsiveStyle,
  style
} from "styled-system";

export default {
  space,
  color,
  width,
  boxShadow,
  height: responsiveStyle({
    prop: "height",
    cssProperty: "height",
    numberToPx: true
  }),
  transition: responsiveStyle({
    prop: "transition",
    cssProperty: "transition",
    key: "transitions"
  }),
  fontSize: responsiveStyle({
    prop: "fontSize",
    cssProperty: "fontSize",
    key: "fontSizes"
  }),
  fontWeight: responsiveStyle({
    prop: "fontWeight",
    cssProperty: "fontWeight",
    key: "fontWeights"
  }),
  fontFamily: responsiveStyle({
    prop: "fontFamily",
    cssProperty: "fontFamily",
    key: "fonts"
  }),
  lineHeight: responsiveStyle({
    prop: "lineHeight",
    cssProperty: "lineHeight",
    key: "lineHeights"
  }),
  position: responsiveStyle({
    prop: "position",
    cssProperty: "position"
  }),
  display: responsiveStyle({
    prop: "display",
    cssProperty: "display"
  }),
  flexDirection: responsiveStyle({
    prop: "flexDirection",
    cssProperty: "flexDirection"
  }),
  alignItems: responsiveStyle({
    prop: "alignItems",
    cssProperty: "alignItems"
  }),
  alignSelf: responsiveStyle({ prop: "alignSelf", cssProperty: "alignSelf" }),
  justifyContent: responsiveStyle({
    prop: "justifyContent",
    cssProperty: "justifyContent"
  }),
  flexWrap: responsiveStyle({ prop: "flexWrap", cssProperty: "flexWrap" }),
  order: responsiveStyle({ prop: "order", cssProperty: "order" }),
  top: responsiveStyle({ prop: "top", cssProperty: "top" }),
  right: responsiveStyle({ prop: "right", cssProperty: "right" }),
  bottom: responsiveStyle({ prop: "bottom", cssProperty: "bottom" }),
  left: responsiveStyle({ prop: "left", cssProperty: "left" }),
  borderColor: style({
    prop: "borderColor",
    cssProperty: "borderColor",
    key: "colors"
  }),
  overflow: style({
    prop: "overflow",
    cssProperty: "overflow"
  }),
  textAlign: style({ prop: "textAlign", cssProperty: "textAlign" }),
  backgroundSize: responsiveStyle({
    prop: "bgSize",
    cssProperty: "backgroundSize"
  }),
  bgRepeat: responsiveStyle({
    prop: "bgRepeat",
    cssProperty: "backgroundRepeat"
  }),
  bgPosition: responsiveStyle({
    prop: "bgPosition",
    cssProperty: "backgroundPosition"
  }),
  zIndex: style({ prop: "zIndex", cssProperty: "zIndex" }),
  maxWidth: responsiveStyle({
    prop: "maxWidth",
    cssProperty: "maxWidth"
  })
};
