'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var style = require('./style');

var getDirectionProp = function getDirectionProp(template) {
  return function (dir) {
    return template(dir);
  };
};
var getWidthProp = getDirectionProp(function (dir) {
  return 'border' + dir + 'Width';
});
var getStyleProp = getDirectionProp(function (dir) {
  return 'border' + dir + 'Style';
});

var getDirections = function getDirections(props) {
  var directions = [];
  if (props.borderTop) directions.push('Top');
  if (props.borderRight) directions.push('Right');
  if (props.borderBottom) directions.push('Bottom');
  if (props.borderLeft) directions.push('Left');
  return directions.length ? directions : null;
};

module.exports = function (props) {
  var directions = getDirections(props);
  var borderWidths = directions ? directions.map(function (dir) {
    return style({
      key: 'borderWidths',
      prop: 'borderWidth',
      cssProperty: getWidthProp(dir),
      numberToPx: true
    })(props);
  }) : [style({
    key: 'borderWidths',
    prop: 'borderWidth',
    numberToPx: true
  })(props)];

  var borderStyles = directions ? directions.map(function (dir) {
    return _defineProperty({}, getStyleProp(dir), 'solid');
  }) : [{ borderStyle: 'solid' }];

  return props.borderWidth || props.borderWidth === 0 ? Object.assign.apply(Object, [{}].concat(_toConsumableArray(borderWidths), _toConsumableArray(borderStyles))) : null;
};