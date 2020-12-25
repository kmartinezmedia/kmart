"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prettier = _interopRequireWildcard(require("prettier"));

var _fs = require("fs");

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _process$argv = _slicedToArray(process.argv, 3),
    _nodePath = _process$argv[0],
    _script = _process$argv[1],
    versionBump = _process$argv[2];

var writePrettyFile = function writePrettyFile(outFilePath, content) {
  var parser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'typescript';
  var prettiered = prettier.format(content, {
    parser: parser
  });
  (0, _fs.writeFileSync)(outFilePath, prettiered, {
    encoding: 'utf8',
    flag: 'w'
  });
  console.info("Wrote ".concat(outFilePath));
};

var tempLib = _path["default"].join(process.cwd(), 'lib-temp');

var lib = _path["default"].join(process.cwd(), 'lib');

var version = process.env.npm_package_version;

if (versionBump) {
  console.log(version);
  (0, _child_process.execSync)("npm version ".concat(versionBump));
  version = require('../package.json').version;
  console.log(version);
} // Cleanup


if ((0, _fs.existsSync)(tempLib)) {
  (0, _child_process.execSync)('rimraf lib-temp');
}

if ((0, _fs.existsSync)(lib)) {
  (0, _child_process.execSync)('rimraf lib');
} // Build temp-lib


(0, _child_process.execSync)('babel src --out-dir lib-temp --extensions .ts,.tsx'); // Run typescript in temp-lib

(0, _child_process.execSync)('tsc'); // Create lib

(0, _fs.mkdirSync)("lib"); // Copy temp-lib to lib

(0, _child_process.execSync)("cp -r lib-temp/* lib");
var packages = (0, _fs.readdirSync)(tempLib).filter(function (f) {
  return (0, _fs.statSync)(_path["default"].join(tempLib, f)).isDirectory();
});

var babelMacrosVersion = require('../package.json').devDependencies['babel-plugin-macros']; // Create package.json for each package


var deps = {
  theme: {
    "@kmart/utils": "^".concat(version),
    "@kmart/css.macro": "^".concat(version)
  },
  utils: {
    'lodash/camelCase': '4.17.20',
    'lodash/kebabCase': '4.17.20',
    'lodash/upperFirst': '4.17.20'
  },
  'palette.macro': {
    'babel-plugin-macros': babelMacrosVersion
  },
  'css.macro': {
    'babel-plugin-macros': babelMacrosVersion
  }
};
var peerDeps = {
  "theme": {
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  },
  "utils": {},
  'palette.macro': {},
  'css.macro': {}
};
packages.forEach(function (name) {
  var packageData = {
    name: "@kmart/".concat(name),
    main: "index.js",
    author: "Katherine Martinez",
    license: "ISC",
    homepage: "https://github.com/kmartinezmedia/kmart/tree/master/src/".concat(name),
    version: version,
    contributors: [{
      "name": "Katherine Martinez",
      "email": "kmartinezmedia@gmail.com"
    }],
    dependencies: deps[name],
    peerDependencies: peerDeps[name]
  };
  writePrettyFile(_path["default"].join(lib, name, 'package.json'), JSON.stringify(packageData), 'json');
}); // delete temp lib folder

(0, _child_process.execSync)('rimraf lib-temp');
