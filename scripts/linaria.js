"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCss = void 0;

var _babelPreset = require("@linaria/babel-preset");

var _fs = require("fs");

var _glob = _interopRequireDefault(require("glob"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _normalizePath = _interopRequireDefault(require("normalize-path"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var cssInDir = _path["default"].join(process.cwd(), 'src/css');

var processCss = function processCss(libDir) {
  var files = (0, _fs.readdirSync)(cssInDir);
  var options = {
    sourceMaps: false
  };
  var count = 0;
  var resolvedFiles = files.reduce(function (acc, item) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(_glob["default"].sync(_path["default"].join(cssInDir, item), {
      absolute: true
    })));
  }, []);
  resolvedFiles.forEach(function (filename) {
    var outputBasename = _path["default"].basename(filename).replace(_path["default"].extname(filename), '.css');

    var outputFilename = _path["default"].join(libDir, outputBasename);

    var _transform = (0, _babelPreset.transform)((0, _fs.readFileSync)(filename).toString(), {
      filename: filename,
      outputFilename: outputFilename,
      pluginOptions: {
        configFile: _path["default"].join(process.cwd(), 'linaria.config.js')
      }
    }),
        cssText = _transform.cssText,
        sourceMap = _transform.sourceMap,
        cssSourceMapText = _transform.cssSourceMapText;

    if (cssText) {
      _mkdirp["default"].sync(_path["default"].dirname(outputFilename));

      var cssContent = options.sourceMaps && sourceMap ? "".concat(cssText, "\n/*# sourceMappingURL=").concat(outputFilename, ".map */") : cssText;
      (0, _fs.writeFileSync)(outputFilename, cssContent);

      if (options.sourceMaps && sourceMap && typeof cssSourceMapText !== 'undefined') {
        (0, _fs.writeFileSync)("".concat(outputFilename, ".map"), cssSourceMapText);
      }

      var inputFilename = _path["default"].resolve(libDir, _path["default"].relative(cssInDir, filename));

      var normalizedInputFilename = inputFilename.replace(/\.tsx?/, '.js');
      var relativePath = (0, _normalizePath["default"])(_path["default"].relative(_path["default"].dirname(inputFilename), outputFilename));
      var requireStatement = "\nrequire('".concat(relativePath.startsWith('.') ? relativePath : "./".concat(relativePath), "');");
      var inputContent = (0, _fs.readFileSync)(normalizedInputFilename, 'utf-8');

      if (!inputContent.trim().endsWith(requireStatement)) {
        inputContent = "".concat(inputContent, "\n").concat(requireStatement, "\n"); // Remove uneeded linaria import

        inputContent = inputContent.replace("import { css } from '@linaria/core';", '');
        inputContent = inputContent.replace("var _core = require(\"@linaria/core\");", '');
        (0, _fs.writeFileSync)(normalizedInputFilename, inputContent);
      }

      count++;
    }
  }); // eslint-disable-next-line no-console

  console.log("Successfully extracted ".concat(count, " CSS files."));
};

exports.processCss = processCss;
