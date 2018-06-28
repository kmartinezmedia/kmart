import path from "path";
import fs from "fs";
import shell from "shelljs";

export const convertGifs = ({ input, output }) => {
  const inputDir = path.join(process.cwd(), input);
  const outputDir = path.join(process.cwd(), output);
  fs.readdirSync(inputDir).forEach(item => {
    if (item.includes(".gif")) {
      const prefixName = item.split(".")[0];
      const inputFile = `${inputDir}/${item}`;
      const outputPrefix = `${outputDir}/${prefixName}`;
      const outputMp4 = `${outputPrefix}.mp4`;
      const outputWebm = `${outputPrefix}.webm`;
      shell.exec(`ffmpeg -n -i ${inputFile} -b:v 0 -crf 25 ${outputMp4}`);
      shell.exec(
        `ffmpeg -n -i ${inputFile} -c vp9 -b:v 0 -crf 41 ${outputWebm}`
      );
    }
  });
};
