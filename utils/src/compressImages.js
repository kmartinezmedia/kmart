import path from "path";
import compress_images from "compress-images";

export const compressImages = ({ input, output, cb = () => {} }) => {
  const inputDir = path.join(process.cwd(), input);
  const outputDir = path.join(process.cwd(), output);
  console.log(`starting ${input} compression`);
  compress_images(
    `${inputDir}/*.{jpg,JPG,jpeg,JPEG,png,svg}`,
    `${outputDir}/`,
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: false, command: false } },
    function() {
      cb();
    }
  );
};
