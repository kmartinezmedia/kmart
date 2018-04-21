import { baseLineHeight } from "./typography";
import { rems } from "./utils";

export const spacePx = [0, 8, 16, 24, 32, 64, 96, 128, 160, 192];

export const space = spacePx.map((item, i) => rems(item));
