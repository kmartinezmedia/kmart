export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function interpolate(value, rangeA, rangeB, limit) {
  var fromHigh, fromLow, result, toHigh, toLow;
  if (limit == null) {
    limit = false;
  }
  (fromLow = rangeA[0]), (fromHigh = rangeA[1]);
  (toLow = rangeB[0]), (toHigh = rangeB[1]);
  result = toLow + (value - fromLow) / (fromHigh - fromLow) * (toHigh - toLow);
  if (limit === true) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow;
      }
      if (result > toHigh) {
        return toHigh;
      }
    } else {
      if (result > toLow) {
        return toLow;
      }
      if (result < toHigh) {
        return toHigh;
      }
    }
  }
  return result;
}
