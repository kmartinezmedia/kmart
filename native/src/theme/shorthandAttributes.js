import { space, color, width, style } from "../styled-system";

export const shorthandAttributes = {
  space,
  color,
  width,
  height: style({
    prop: "height",
    cssProperty: "height"
  }),
  fontSize: style({
    prop: "fontSize",
    cssProperty: "fontSize",
    key: "fontSizes"
  }),
  lineHeight: style({
    prop: "lineHeight",
    cssProperty: "lineHeight",
    key: "lineHeights"
  }),
  letterSpacing: style({
    prop: "letterSpacing",
    cssProperty: "letterSpacing"
  }),
  minW: style({
    prop: "minWidth",
    cssProperty: "minWidth"
  }),
  minH: style({
    prop: "minHeight",
    cssProperty: "minHeight"
  }),
  flexDirection: style({
    prop: "flexDirection",
    cssProperty: "flexDirection"
  }),
  alignItems: style({
    prop: "alignItems",
    cssProperty: "alignItems"
  }),
  alignSelf: style({ prop: "alignSelf", cssProperty: "alignSelf" }),
  justifyContent: style({
    prop: "justifyContent",
    cssProperty: "justifyContent"
  }),
  flexWrap: style({ prop: "flexWrap", cssProperty: "flexWrap" }),
  order: style({ prop: "order", cssProperty: "order" }),
  top: style({ prop: "top", cssProperty: "top" }),
  right: style({ prop: "right", cssProperty: "right" }),
  bottom: style({ prop: "bottom", cssProperty: "bottom" }),
  left: style({ prop: "left", cssProperty: "left" }),
  borderRadius: style({ prop: "borderRadius", cssProperty: "borderRadius" }),
  borderColor: style({
    prop: "borderColor",
    cssProperty: "borderColor",
    key: "colors"
  }),
  borderWidth: style({
    prop: "borderWidth",
    cssProperty: "borderWidth"
  }),
  opacity: style({
    prop: "opacity",
    cssProperty: "opacity"
  }),
  flexGrow: style({
    prop: "flexGrow",
    cssProperty: "flexGrow"
  }),
  textAlign: style({ prop: "textAlign", cssProperty: "textAlign" }),
  zIndex: style({ prop: "zIndex", cssProperty: "zIndex" }),
  transform: style({ prop: "transform", cssProperty: "transform" }),
  position: style({
    prop: "position",
    cssProperty: "position"
  })
};
