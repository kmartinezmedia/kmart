import * as prettier from 'prettier';
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { execSync } from 'child_process';
import path  from 'path';

const [_nodePath, _script, versionBump] = process.argv;

type PackageName = 'theme' | 'utils' | 'palette.macro' | 'types';

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


// execSync('minify src/palette.macro/index.ts --out-file src/palette.macro/index.js');

// Build temp-lib
execSync('babel src --out-dir lib-temp --extensions .ts,.tsx')

// Run typescript in temp-lib
execSync('tsc')

// Create lib
mkdirSync("lib");

// Copy temp-lib to lib
execSync(`cp -r lib-temp/* lib`);

const getVersion = (packageName: string) => {
  return require('../package.json').devDependencies[packageName];
} 

const packages = readdirSync(tempLib).filter(f => statSync(path.join(tempLib, f)).isDirectory()) as PackageName[]

// Create package.json for each package
const configs: Record<PackageName, object> = {
  theme: {
    main: 'index.js',
    dependencies: {
      "@kmart/utils": `^${version}`,
      "@kmart/types": `^${version}`
    },
    peerDependencies: {
      "react": "^16.9.0",
      "react-dom": "^16.9.0"
    }
  },
  utils: {
    main: 'index.js',
    dependencies: {
      "@kmart/types": `^${version}`,
      'lodash/camelCase': getVersion('lodash'),
      'lodash/kebabCase': getVersion('lodash'),
      'lodash/upperFirst': getVersion('lodash')
    }
  },
  'palette.macro': {
    main: 'index.js',
    dependencies: {
      "@kmart/types": `^${version}`,
      'babel-plugin-macros': getVersion('babel-plugin-macros')
    },
  },
  types: {
    types: "./index.d.ts",
    dependencies: {
      "@types/react": "^16.9.0",
      "type-fest": getVersion('type-fest')
    },
    peerDependencies: {
      "typescript": getVersion('typescript')
    }
  }
};

packages.forEach(name => {
  const packageData = {
    name: `@kmart/${name}`,
    author: "Katherine Martinez",
    license: "ISC",
    private: false,
    homepage: `https://github.com/kmartinezmedia/kmart/tree/master/src/${name}`,
    version,
    contributors: [
      {
        "name": "Katherine Martinez",
        "email": "kmartinezmedia@gmail.com"
      }
    ],
    ...configs[name]
  }
  writePrettyFile(path.join(lib, name, 'package.json'), JSON.stringify(packageData), 'json');
  // execSync(`cd ${path.join(lib, name)} && npm publish --access public`)
})

// delete temp lib folder
execSync('rimraf lib-temp')

// delete unused js versions of declaration files
// TODO: lookup * .d.js estension to delete
execSync('rimraf lib/types/index.js && rimraf lib/theme/css.d.js')

// execSync(`cp -r lib/* node_modules/@kmart`);