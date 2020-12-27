import {camelCase as _camelCase, kebabCase as _kebabCase, upperFirst } from 'lodash';
import { CamelCase, KebabCase, PascalCase } from 'type-fest';

export const camelCase = <T extends string>(str: T): CamelCase<T> =>
  _camelCase(str) as CamelCase<T>;

export const pascalCase = <T extends string>(str: T) =>
  upperFirst(camelCase(str)) as PascalCase<typeof str>;

export const kebabCase = <T extends string>(str: T) =>
  _kebabCase(str) as KebabCase<typeof str>;

export const toCssVar = <T extends string>(str: T) => {
  return `--${kebabCase(str)}` as const;
};

export const toCssVarFn = <T extends string>(str: T) => {
  return `var(${toCssVar(str)})` as const;
};

export const capitalize = <T extends string>(str: T): Capitalize<T> => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
};
