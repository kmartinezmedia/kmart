export const replaceAlpha = (value: string, newOpacity: number) => {
  return value.replace(/,[^,]+$/, `,${newOpacity})`);
};

// Some components in RN require converting palette color from rgba to hex
// https://jsfiddle.net/Mottie/xcqpF/1/light/
export const rgb2hex = (rgb: string) => {
  const rgbMatch = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i,
  );
  return rgbMatch && rgbMatch.length === 4
    ? '#' +
        ('0' + parseInt(rgbMatch[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgbMatch[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgbMatch[3], 10).toString(16)).slice(-2)
    : '';
};
