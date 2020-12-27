import * as prettier from 'prettier';
import { existsSync, readdirSync, statSync, writeFileSync } from 'fs'
import { execSync } from 'child_process';
import path  from 'path';

const libDir = path.join(process.cwd(), 'lib');

const [_nodePath, _script, versionBump] = process.argv;
const oldVersion = process.env.npm_package_version;
let version = process.env.npm_package_version;

type PackageName = 'theme' | 'utils' | 'types' | 'css';

const writePrettyFile = (outFilePath: string, content: string, parser: prettier.BuiltInParserName | undefined = 'typescript'): void => {
  const prettiered = prettier.format(content, {
    parser: parser
  });
  writeFileSync(outFilePath, prettiered, { encoding: 'utf8', flag: 'w' });
  console.info(`Wrote ${outFilePath}`);
}

if (versionBump) {
  console.log(version)
  execSync(`npm version ${versionBump}`)
  version = require('../package.json').version;
  console.log(version)
}

// Cleanup
if (existsSync(libDir)) {
  execSync('rimraf lib')
}

// Build temp-lib
execSync('npx babel src --out-dir lib --extensions .ts,.tsx --copy-files')

// Run typescript in temp-lib
execSync('tsc')

// Create lib
// mkdirSync("lib");

// Copy temp-lib to lib
// execSync(`cp -r lib-temp/* lib`);

const getVersion = (packageName: string) => {
  return require('../package.json').devDependencies[packageName];
} 

const packages = readdirSync(libDir).filter(f => statSync(path.join(libDir, f)).isDirectory()) as PackageName[]

// Create package.json for each package
const configs: Record<PackageName, object> = {
  css: {
    main: 'index.js',
    module: 'index.js',
    sideEffects: ["*.css"],
    files: ['*.css'],
    dependencies: {
      "@kmart/types": `^${version}`
    },
    peerDependencies: {}
  },
  theme: {
    main: 'index.js',
    module: 'index.js',
    sideEffects: ["*.css"],
    dependencies: {
      "@kmart/css": `^${version}`,
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
    module: 'index.js',
    dependencies: {
      "@kmart/types": `^${version}`
    }
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
    scripts: {
      deploy: "npm publish --access public"
    },
    ...configs[name]
  }
  execSync(`cp -r .npmrc lib/${name}/.npmrc`);
  writePrettyFile(path.join(libDir, name, 'package.json'), JSON.stringify(packageData), 'json');
  if (oldVersion !== version) {
    execSync(`cd ${path.join(libDir, name)} && npm run deploy`)
  }
})

// CLEANUP
// delete unused js versions of declaration files
// TODO: lookup * .d.js estension to delete
execSync([
  // 'rimraf lib-temp',
  'rimraf lib/types/index.js',
  'rimraf lib/theme/css.d.js',
  'rimraf lib/css/index.d.ts'
].join(' && '))