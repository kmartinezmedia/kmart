import { PaletteConfigTransformed } from '@kmart/types';


declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Properties extends PaletteConfigTransformed {}
}
