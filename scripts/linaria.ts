import { transform } from '@linaria/babel-preset';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import mkdirp from 'mkdirp';
import normalize from 'normalize-path';
import path from 'path';

const cssInDir = path.join(process.cwd(), 'src/css');

export const processCss = (libDir: string) => {
  const files = readdirSync(cssInDir);
  const options = { sourceMaps: false };
  let count = 0;

  const resolvedFiles = files.reduce(
    (acc, item) => [...acc, ...glob.sync(path.join(cssInDir, item), { absolute: true })],
    [] as string[]
  );

  resolvedFiles.forEach(filename => {
    const outputBasename = path.basename(filename).replace(path.extname(filename), '.css');

    const outputFilename = path.join(libDir, outputBasename);

    const { cssText, sourceMap, cssSourceMapText } = transform(readFileSync(filename).toString(), {
      filename,
      outputFilename,
      pluginOptions: {
        configFile: path.join(process.cwd(), 'linaria.config.js'),
      },
    });

    if (cssText) {
      mkdirp.sync(path.dirname(outputFilename));

      const cssContent =
        options.sourceMaps && sourceMap
          ? `${cssText}\n/*# sourceMappingURL=${outputFilename}.map */`
          : cssText;

      writeFileSync(outputFilename, cssContent);

      if (options.sourceMaps && sourceMap && typeof cssSourceMapText !== 'undefined') {
        writeFileSync(`${outputFilename}.map`, cssSourceMapText);
      }

      const inputFilename = path.resolve(libDir, path.relative(cssInDir, filename));

      const normalizedInputFilename = inputFilename.replace(/\.tsx?/, '.js');

      const relativePath = normalize(path.relative(path.dirname(inputFilename), outputFilename));

      const requireStatement = `\nrequire('${
        relativePath.startsWith('.') ? relativePath : `./${relativePath}`
      }');`;

      let inputContent = readFileSync(normalizedInputFilename, 'utf-8');

      if (!inputContent.trim().endsWith(requireStatement)) {
        inputContent = `${inputContent}\n${requireStatement}\n`;

        // Remove uneeded linaria import
        inputContent = inputContent.replace(`import { css } from '@linaria\/core';`, '');
        inputContent = inputContent.replace(`var _core = require\("@linaria\/core"\);`, '');

        writeFileSync(normalizedInputFilename, inputContent);
      }

      count++;
    }
  });

  // eslint-disable-next-line no-console
  console.log(`Successfully extracted ${count} CSS files.`);
};
