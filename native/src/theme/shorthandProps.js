import { Dimensions } from "react-native";
import { default as spaceProps } from "./spaceProps";

export const shorthandProps = {
  ...spaceProps,
  hide: {
    opacity: 0
  },
  absolute: {
    position: "absolute"
  },
  relative: {
    position: "relative"
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  columns: {
    flexDirection: "row"
  },
  stacked: {
    flexDirection: "column"
  },
  rounded: {
    borderRadius: 50
  },
  small: {
    height: 20,
    width: 20
  },
  large: {
    height: 40,
    width: 40
  },
  halfRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 1
  },
  br: {
    borderRadius: 8
  },
  fullHeight: {
    height: Dimensions.get("screen").height
  },
  fullWidth: {
    width: Dimensions.get("screen").width
  },
  jcsb: {
    justifyContent: "space-between"
  },
  jcsa: {
    justifyContent: "space-around"
  },
  jcc: {
    justifyContent: "center"
  },
  jcfs: {
    justifyContent: "flex-start"
  },
  jcfe: {
    justifyContent: "flex-end"
  },
  aisb: {
    justifyContent: "space-between"
  },
  aisa: {
    alignItems: "space-around"
  },
  aic: {
    alignItems: "center"
  },
  aifs: {
    alignItems: "flex-start"
  },
  aife: {
    alignItems: "flex-end"
  },
  asc: {
    alignSelf: "center"
  },
  asfs: {
    alignSelf: "flex-start"
  },
  asfe: {
    alignSelf: "flex-end"
  },
  w100: {
    width: " 100%"
  },
  w75: {
    width: "75%"
  },
  w50: {
    width: "50%"
  },
  w25: {
    width: "25%"
  },
  h100: {
    height: " 100%"
  },
  h75: {
    height: "75%"
  },
  h50: {
    height: "50%"
  },
  h25: {
    height: "25%"
  },
  flex1: {
    flex: 1
  },
  btw1: {
    borderTopWidth: 1
  },
  bw1: {
    borderWidth: 1
  },
  bbw1: {
    borderBottomWidth: 1
  },
  btrr: {
    borderTopRightRadius: 8
  },
  btlr: {
    borderTopLeftRadius: 8
  },
  tac: {
    textAlign: "center"
  },
  tal: {
    textAlign: "left"
  },
  tar: {
    textAlign: "right"
  },
  flex: {
    display: "flex"
  },
  flexNone: {
    flex: "none"
  },
  flex0: {
    flex: "0"
  },
  wrap: {
    flexWrap: "wrap"
  },
  noWrap: {
    flexWrap: "nowrap"
  },
  cover: {
    resizeMode: "cover"
  },
  contain: {
    resizeMode: "contain"
  },
  z_1: {
    zIndex: -1
  },
  z0: {
    zIndex: 0
  },
  z1: {
    zIndex: 1
  },
  z2: {
    zIndex: 2
  },
  z3: {
    zIndex: 3
  },
  ov: {
    overflow: "visible"
  },
  py10: {
    paddingVertical: 10
  }
};
