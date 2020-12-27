import path  from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import normalize from 'normalize-path';
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { transform } from '@linaria/babel-preset';

const cssInDir = path.join(process.cwd(), 'src/css');
const cssOutDir = path.join(process.cwd(), 'lib/css');

const files = readdirSync(cssInDir);
const options = { sourceMaps: false };
let count = 0;

const resolvedFiles = files.reduce(
  (acc, item) => [
    ...acc,
    ...glob.sync(path.join(cssInDir, item), { absolute: true }),
  ],
  [] as string[]
);

resolvedFiles.forEach((filename) => {
  const outputBasename = path
    .basename(filename)
    .replace(path.extname(filename), '.css');

  const outputFilename = path.join(cssOutDir, outputBasename)

  const { cssText, sourceMap, cssSourceMapText } = transform(
    readFileSync(filename).toString(),
    {
      filename,
      outputFilename,
      pluginOptions: {
        configFile: path.join(process.cwd(), 'linaria.config.js')
      },
    }
  );

  if (cssText) {
    mkdirp.sync(path.dirname(outputFilename));

    const cssContent =
      options.sourceMaps && sourceMap
        ? `${cssText}\n/*# sourceMappingURL=${outputFilename}.map */`
        : cssText;

    writeFileSync(outputFilename, cssContent);

    if (
      options.sourceMaps &&
      sourceMap &&
      typeof cssSourceMapText !== 'undefined'
    ) {
      writeFileSync(`${outputFilename}.map`, cssSourceMapText);
    }

      const inputFilename = path.resolve(
        cssOutDir,
        path.relative(cssInDir, filename)
      );

      const normalizedInputFilename = inputFilename.replace(/\.tsx?/, '.js')

      const relativePath = normalize(
        path.relative(path.dirname(inputFilename), outputFilename)
      );

      const requireStatement = `\nrequire('${
        relativePath.startsWith('.') ? relativePath : `./${relativePath}`
      }');`;

      let inputContent = readFileSync(normalizedInputFilename, 'utf-8');

      if (!inputContent.trim().endsWith(requireStatement)) {
        inputContent = `${inputContent}\n${requireStatement}\n`;
        // Remove uneeded linaria import
        inputContent = inputContent.replace(`import { css } from '@linaria\/core';`, '');
        
        writeFileSync(
          normalizedInputFilename,
          inputContent
        );
      }

    count++;
  }
});

// eslint-disable-next-line no-console
console.log(`Successfully extracted ${count} CSS files.`);