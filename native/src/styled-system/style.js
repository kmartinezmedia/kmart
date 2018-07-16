"use strict";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var _require = require("./util"),
  get = _require.get,
  is = _require.is,
  px = _require.px;

module.exports = function(_ref) {
  var key = _ref.key,
    prop = _ref.prop,
    cssProperty = _ref.cssProperty,
    numberToPx = _ref.numberToPx;
  return function(props) {
    var n = props[prop];
    if (!is(n)) return null;
    var val = get(props, ["theme", key, n].join("."), n);
    var value = numberToPx ? px(val) : val;

    return _defineProperty({}, cssProperty || prop, value);
  };
};