import * as prettier from 'prettier';
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { execSync } from 'child_process';
import path  from 'path';

const [_nodePath, _script, versionBump] = process.argv;

type PackageName = 'theme' | 'utils' | 'palette.macro' | 'css.macro';

const writePrettyFile = (outFilePath: string, content: string, parser: prettier.BuiltInParserName | undefined = 'typescript'): Promise<string> => {
  const prettiered = prettier.format(content, {
    parser: parser
  });
  writeFileSync(outFilePath, prettiered, { encoding: 'utf8', flag: 'w' });
  console.info(`Wrote ${outFilePath}`);
}

const tempLib = path.join(process.cwd(), 'lib-temp');
const lib = path.join(process.cwd(), 'lib');
let version = process.env.npm_package_version;

if (versionBump) {
  console.log(version)
  execSync(`npm version ${versionBump}`)
  version = require('../package.json').version;
  console.log(version)
}

// Cleanup
if (existsSync(tempLib)) {
  execSync('rimraf lib-temp')
}

if (existsSync(lib)) {
  execSync('rimraf lib')
}

// Build temp-lib
execSync('babel src --out-dir lib-temp --extensions .ts,.tsx')

// Run typescript in temp-lib
execSync('tsc')

// Create lib
mkdirSync("lib");

// Copy temp-lib to lib
execSync(`cp -r lib-temp/* lib`);


const packages = readdirSync(tempLib).filter(f => statSync(path.join(tempLib, f)).isDirectory()) as PackageName[]
const babelMacrosVersion = require('../package.json').devDependencies['babel-plugin-macros'];
// Create package.json for each package
const deps: Record<PackageName, object> = {
  theme: {
    "@kmart/utils": `^${version}`,
    "@kmart/css.macro": `^${version}`
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

const peerDeps: Record<PackageName, object> = {
  "theme": {
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  },
  "utils": {},
  'palette.macro': {},
  'css.macro': {}
};

packages.forEach(name => {
  const packageData = {
    name: `@kmart/${name}`,
    main: "index.js",
    author: "Katherine Martinez",
    license: "ISC",
    homepage: `https://github.com/kmartinezmedia/kmart/tree/master/src/${name}`,
    version,
    contributors: [
      {
        "name": "Katherine Martinez",
        "email": "kmartinezmedia@gmail.com"
      }
    ],
    dependencies: deps[name],
    peerDependencies: peerDeps[name]
  }
  writePrettyFile(path.join(lib, name, 'package.json'), JSON.stringify(packageData), 'json');
})

// delete temp lib folder
execSync('rimraf lib-temp')