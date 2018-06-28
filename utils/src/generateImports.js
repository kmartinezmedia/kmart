import fs from "fs";

const getFileNames = ({ dir, showExtension }) => {
  const files = fs
    .readdirSync(dir)
    .filter(x => x.includes("."))
    .filter(x => x.split(".")[0] !== "index")
    .filter(x => x.split(".")[1] !== "DS_Store");
  if (showExtension) {
    return files;
  } else {
    return files.map(item => item.split(".")[0]);
  }
};

export const generateImports = ({ dir }) => {
  const files = getFileNames(dir);
  return `import {${files.join(", ")}} from "./${dir}"`;
};
