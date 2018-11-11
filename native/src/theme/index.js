import * as typography from './typography';
import colors from './colors';
import space from './space';
import { shorthandProps } from './shorthandProps';
import { shorthandAttributes } from './shorthandAttributes';
import { setupComponent } from './setupComponent';

export const theme = {
  ...typography,
  shorthandAttributes,
  shorthandProps,
  setupComponent,
  colors,
  space,
  defaultRadius: '4px',
};
