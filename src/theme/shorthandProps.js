import { default as spaceProps } from "./spaceProps";
import { shadows } from "./shadows";

export default {
  fixed: {
    position: "fixed"
  },
  absolute: {
    position: "absolute"
  },
  relative: {
    position: "relative"
  },
  block: {
    display: "block"
  },
  inlineBlock: {
    display: "inline-block"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex"
  },
  flex1: {
    flex: 1
  },
  midY: {
    position: "absolute",
    top: "50%",
    transform: "translate3d(0, -50%, 0)"
  },
  midX: {
    position: "absolute",
    top: "50%",
    transform: "translate3d(-50%, 0, 0)"
  },
  mid: {
    position: "absolute",
    top: "50%",
    transform: "translate3d(-50%, -50%, 0)"
  },
  uppercase: {
    textTransform: "uppercase"
  },
  lowercase: {
    textTransform: "lowercase"
  },
  capitalize: {
    textTransform: "capitalize"
  },
  italic: { fontStyle: "italic" },
  cover: {
    backgroundSize: "cover"
  },
  contain: {
    backgroundSize: "contain"
  },
  repeat: {
    backgroundRepeat: "repeat"
  },
  noRepeat: {
    backgroundRepeat: "no-repeat"
  },
  wrap: {
    flexWrap: "wrap"
  },
  columns: {
    flexDirection: "row"
  },
  stacked: {
    flexDirection: "column"
  },
  hide: {
    opacity: 0
  },
  show: {
    opacity: 1
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
  tac: {
    textAlign: "center"
  },
  tal: {
    textAlign: "left"
  },
  tar: {
    textAlign: "right"
  },
  round: {
    borderRadius: "50%"
  },
  br4: {
    borderRadius: "4px"
  },
  br8: {
    borderRadius: "8px"
  },
  bw1: {
    borderWidth: "1px",
    borderStyle: "solid"
  },
  bw4: {
    borderWidth: "4px",
    borderStyle: "solid"
  },
  acs: {
    alignContent: "start"
  },
  acc: {
    alignContent: "center"
  },
  ace: {
    alignContent: "end"
  },
  acn: {
    alignContent: "normal"
  },
  grid: {
    display: "grid"
  },
  cols2: {
    gridTemplateColumns: "50% 50%"
  },
  rows2: {
    gridTemplateRows: "50% 50%"
  },
  objContain: {
    objectFit: "contain"
  },
  objCover: {
    objectFit: "cover"
  },
  vh100: {
    height: "100vh"
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
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
  pointer: {
    cursor: "pointer"
  },
  circle: {
    borderRadius: "50%"
  },
  halfRadius: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  ...spaceProps,
  shadow1: {
    ...shadows[0]
  },
  shadow2: {
    ...shadows[1]
  },
  shadow3: {
    ...shadows[2]
  },
  shadow4: {
    ...shadows[3]
  },
  shadow5: {
    ...shadows[4]
  },
  shadow6: {
    ...shadows[5]
  },
  shadow7: {
    ...shadows[6]
  }
};
