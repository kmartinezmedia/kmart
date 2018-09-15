export { default as ThemeProvider } from "./ThemeProvider";
export * from "./core";
export * from "./theme";

export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
