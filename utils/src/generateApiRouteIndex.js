import path from "path";
import fs from "fs";
import startsWith from "lodash/startsWith";

export const generateApiRouteIndex = ({ input, output }) => {
  const getFileNames = () => {
    let fileNames = [];
    const dir = path.join(process.cwd(), input);
    fs.readdirSync(dir).forEach(async item => {
      const contentPath = path.join(dir, item);
      if (!fs.statSync(contentPath).isDirectory()) {
        fileNames.push(item);
      }
    });
    return fileNames;
  };

  const routes = getFileNames()
    .filter(file => !startsWith(file, "."))
    .filter(file => !file.includes("index"))
    .filter(file => file !== "")
    .filter(item => item.split(".")[1] === "js")
    .map(item => item.split(".")[0])
    .filter(item => item.split(".")[0] !== "app");

  const routeImports = routes.map(item => {
    return `import ${item} from "./${item}";`;
  });
  const routeDefs = routes.map(item => {
    return `${`app.use("/${item}", ${item})`}`;
  });

  const apiIndexFile = `import app from "./app";
${routeImports.join("\n")}

${routeDefs.join("\n")}
`;

  fs.writeFileSync(output, apiIndexFile);
};
