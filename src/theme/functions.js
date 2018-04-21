import { space } from "styled-system";
import shorthandAttributes from "./shorthandAttributes";

export const functions = {
  m: value => space({ m: value }),
  mt: value => space({ mt: value }),
  mr: value => space({ mr: value }),
  mb: value => space({ mb: value }),
  ml: value => space({ ml: value }),
  mx: value => space({ mx: value }),
  my: value => space({ my: value }),
  p: value => space({ p: value }),
  pt: value => space({ pt: value }),
  pr: value => space({ pr: value }),
  pb: value => space({ pb: value }),
  pl: value => space({ pl: value }),
  px: value => space({ px: value }),
  py: value => space({ py: value }),
  fontSize: value => shorthandAttributes.fontSize({ fontSize: value })
};
