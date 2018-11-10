#!/usr/bin/env node

import path from 'path';
import compress_images from 'compress-images';
import chalk from 'chalk';

// const args = process.argv;
// const commands = ["compress-images", "exports", "complete", "help"];

// // usage represents the help guide
// const usage = function() {
//   const usageText = `
//   kmart utils help you with new react projects.

//   usage:
//     kmart-utils <command>

//     commands can be:

//     new:      used to create a new todo
//     get:      used to retrieve your todos
//     complete: used to mark a todo as complete
//     help:     used to print the usage guide
//   `;

//   console.log(chalk.yellow(usageText));
// };

// if (args.length < 3) {
//   chalk.red(`only one argument can be accepted`);
//   usage();
// }

export const compressImages = ({ input, output, cb = () => {} }) => {
  const inputDir = path.join(process.cwd(), input);
  const outputDir = path.join(process.cwd(), output);
  const log = chalk.green(`starting ${input} compression`);
  console.log(log);
  compress_images(
    `${inputDir}/*.{jpg,JPG,jpeg,JPEG,png,svg}`,
    `${outputDir}/`,
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
    { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: false, command: false } },
    function() {
      cb();
    },
  );
};
