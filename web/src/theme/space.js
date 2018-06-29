import { rems } from "./utils";
import { spacePx } from "@kmart/utils/lib/space";

export const space = spacePx.map((item, i) => rems(item));
