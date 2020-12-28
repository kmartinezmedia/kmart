export const emptyArray = [];

export const join = (...args: Array<string | undefined>) => {
  return args.filter(Boolean).join(' ');
};
