"use strict";

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

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
  arr = _require.arr,
  px = _require.px,
  neg = _require.neg,
  num = _require.num,
  breaks = _require.breaks,
  dec = _require.dec,
  media = _require.media,
  merge = _require.merge;

var _require2 = require("./constants"),
  space = _require2.space;

var REG = /^[mp][trblxy]?$/;

module.exports = function(props) {
  var keys = Object.keys(props)
    .filter(function(key) {
      return REG.test(key);
    })
    .sort();
  var bp = breaks(props);
  var sc = get(props, "theme.space", space);

  return keys
    .map(function(key) {
      var val = props[key];
      var p = getProperties(key);

      if (!Array.isArray(val)) {
        return p.reduce(function(a, b) {
          return Object.assign(a, _defineProperty({}, b, mx(sc)(val)));
        }, {});
      }

      return arr(val)
        .map(mx(sc))
        .map(dec(p))
        .map(media(bp))
        .reduce(merge, {});
    })
    .reduce(merge, {});
};

var mx = function mx(scale) {
  return function(n) {
    if (!num(n)) {
      return n;
    }

    var value = scale[Math.abs(n)] || Math.abs(n);
    if (!num(value)) {
      return value;
    }

    return px(value * (neg(n) ? -1 : 1));
  };
};

var getProperties = function getProperties(key) {
  var _key$split = key.split(""),
    _key$split2 = _slicedToArray(_key$split, 2),
    a = _key$split2[0],
    b = _key$split2[1];

  var prop = properties[a];
  var dirs = directions[b] || [""];
  return dirs.map(function(dir) {
    return prop + dir;
  });
};

var properties = {
  m: "margin",
  p: "padding"
};

var directions = {
  t: ["Top"],
  r: ["Right"],
  b: ["Bottom"],
  l: ["Left"],
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
