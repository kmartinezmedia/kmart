import * as prettier from 'prettier';
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { execSync } from 'child_process';
import path  from 'path';
import fsExtra from 'fs-extra';
import { processCss } from "./linaria";

type PackageName = 'css' | 'kmart' | 'theme' | 'utils' | 'types';

const [_nodePath, _script, versionBump] = process.argv;
const libDir = path.join(process.cwd(), 'lib');
const typingsDir = path.join(process.cwd(), 'typings');
let version = process.env.npm_package_version;

// es6 syntax (import) and cjs/commonjs syntax (require)
const outputs = ['es6', 'cjs'];

// Bump version if yarn build is run with major, minor or patch
if (versionBump) {
  console.log('Current version:', version)
  execSync(`npm version ${versionBump}`)
  version = require('../package.json').version;
  console.log('New version:', version)
}

const getDepVersion = (packageName: string) => {
  return require('../package.json').devDependencies[packageName];
} 

const getPkgPath = (name: string, ...args: string[]) => {
  return path.join(libDir, name, ...args);
}

// Create package.json for each package
const configs: Record<PackageName, object> = {
  kmart: {
    main: 'cjs/index.js',
    module: 'es6/index.js',
    sideEffects: ["*.css"],
    files: ['*.css'],
    dependencies: {
      "@kmart/css": `^${version}`,
      "@kmart/theme": `^${version}`,
      "@kmart/types": `^${version}`,
      "@kmart/utils": `^${version}`
    },
  },
  css: {
    main: 'cjs/index.js',
    module: 'es6/index.js',
    sideEffects: ["*.css"],
    files: ['*.css'],
    dependencies: {
      "@kmart/types": `^${version}`
    },
    peerDependencies: {}
  },
  theme: {
    main: 'cjs/index.js',
    module: 'es6/index.js',
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
    main: 'cjs/index.js',
    module: 'es6/index.js',
    dependencies: {
      "@kmart/types": `^${version}`
    }
  },
  types: {
    types: "./index.d.ts",
    dependencies: {
      "@types/react": "^16.9.0",
      "type-fest": getDepVersion('type-fest')
    },
    peerDependencies: {
      "typescript": getDepVersion('typescript')
    }
  }
};


const writePrettyFile = (outFilePath: string, content: string, parser: prettier.BuiltInParserName | undefined = 'typescript'): void => {
  const prettiered = prettier.format(content, {
    parser: parser
  });
  writeFileSync(outFilePath, prettiered, { encoding: 'utf8', flag: 'w' });
  console.info(`Wrote ${outFilePath}`);
}

// Cleanup old build
if (existsSync(libDir)) {
  execSync('rimraf lib')
}

// Build types to temp typings folder at root
execSync('tsc')

// Get packages created from typescript
const packages = readdirSync(typingsDir).filter(f => statSync(path.join(typingsDir, f)).isDirectory()) as PackageName[];

// Build temp es6 and cjs folders and copy over to lib
outputs.forEach(output => {
  execSync(`BABEL_ENV=${output} npx babel src --out-dir ${output} --extensions .ts,.tsx --copy-files`)
  packages.forEach(pkg => {
    fsExtra.moveSync(`${output}/${pkg}`, `lib/${pkg}/${output}`);
  })
  processCss(path.join(process.cwd(), 'lib/css', output))
})

// Copy temporary typings to typings folder for each package
packages.forEach(pkg => {
  if (pkg === 'types') {
    execSync('rimraf lib/types')
    fsExtra.moveSync(`typings/${pkg}`, `lib/${pkg}`);
  } else {
    fsExtra.moveSync(`typings/${pkg}`, `lib/${pkg}/typings`);
  }
})


packages.forEach(name => {
  const packageData = {
    name: name === 'kmart' ? 'kmart' : `@kmart/${name}`,
    author: "Katherine Martinez",
    license: "ISC",
    private: false,
    homepage: `https://github.com/kmartinezmedia/kmart/tree/master/src/${name}`,
    version,
    contributors: [
      {
        name: "Katherine Martinez",
        email: "kmartinezmedia@gmail.com"
      }
    ],
    publishConfig: {
      registry: "https://registry.npmjs.org"
    },
    typings: "./typings",
    ...configs[name]
  }

  const pkgJson = JSON.stringify(packageData);
  const pkgJsonPath = getPkgPath(name, 'package.json');
  // Add package.json file for package
  writePrettyFile(pkgJsonPath, pkgJson, 'json');

  if (versionBump) {
    execSync(`cd ${getPkgPath(name)} && npm publish --access public`)
  }
})

// CLEANUP
// TODO: lookup * .d.js estension to delete
execSync([
  'rimraf typings',
  'rimraf lib/types/index.js',
  ...outputs.map(item => `rimraf ${item}`),
  ...outputs.map(item => `rimraf lib/theme/${item}/css.d.js`)
].join(' && '))