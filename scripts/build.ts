import * as prettier from 'prettier';
import { existsSync, readdirSync, statSync, writeFileSync } from 'fs'
import { execSync } from 'child_process';
import path  from 'path';
import fsExtra from 'fs-extra';
import { processCss } from "./linaria";


const scopedPkgs = ['css', 'theme', 'utils', 'types'] as const;
const pkgs = [...scopedPkgs, 'kmart'] as const;
type PackageName =  typeof pkgs[number]

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

const pkgVersion = `>=${version}`;

const defaultPkgConfig = {
  main: 'cjs/index.js',
  module: 'es6/index.js',
  'jsnext:main': 'es6/index.js',
  sideEffects: ["*.css"],
  files: [
    "cjs/",
    "es6/",
    "typings/",
    "LICENSE"
  ],
  typings: "./typings",
}

// package.json config for each package
const configs: Record<PackageName, object> = {
  kmart: {
    ...defaultPkgConfig,
    dependencies: {
      "@kmart/css": pkgVersion,
      "@kmart/theme": pkgVersion,
      "@kmart/types": pkgVersion,
      "@kmart/utils": pkgVersion
    },
  },
  css: {
    ...defaultPkgConfig,
    dependencies: {
      "@kmart/types": pkgVersion
    },
    peerDependencies: {}
  },
  theme: {
    ...defaultPkgConfig,
    dependencies: {
      "@kmart/css": pkgVersion,
      "@kmart/utils": pkgVersion,
      "@kmart/types": pkgVersion
    },
    peerDependencies: {
      "react": ">=16.8.0",
      "react-dom": ">=16.8.0"
    }
  },
  utils: {
    ...defaultPkgConfig,
    sideEffects: false,
    dependencies: {
      "@kmart/types": pkgVersion
    }
  },
  types: {
    main: "",
    typings: "./index.d.ts",
    dependencies: {
      "@types/react": "^16",
      "type-fest": getDepVersion('type-fest')
    },
    typeScriptVersion: "4.1"
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
  pkgs.forEach(pkg => {
    const ouputPkgDir = `${output}/${pkg}`;
    if (existsSync(ouputPkgDir)) {
      fsExtra.moveSync(`${output}/${pkg}`, `lib/${pkg}/${output}`);
    }
  })
  
  const cssPkg = getPkgPath('css', output);
  if (existsSync(cssPkg)) {
    processCss(cssPkg)
  }
})


packages.forEach(name => {
  // Copy temporary typings to typings folder for each package
  if (name === 'types') {
    execSync('rimraf lib/types')
    fsExtra.moveSync(`typings/${name}`, getPkgPath(name));
  } else {
    fsExtra.moveSync(`typings/${name}`, getPkgPath(name, 'typings'));
  }

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
      access: 'public',
      registry: "https://registry.npmjs.org"
    },
    ...configs[name]
  }

  const pkgJson = JSON.stringify(packageData);
  const pkgJsonPath = getPkgPath(name, 'package.json');
  // Add package.json file for package
  writePrettyFile(pkgJsonPath, pkgJson, 'json');

  // Copy LICENSE to each package
  fsExtra.copySync('LICENSE', getPkgPath(name, 'LICENSE'));

  if (versionBump) {
    execSync(`cd ${getPkgPath(name)} && npm publish --access public`)
  }
})

const baseTypes = scopedPkgs.map(pkg => `export * from "@kmart/${pkg}";`).join('\n');
writeFileSync(getPkgPath('kmart', 'typings/index.d.ts'), `${baseTypes}`)

// CLEANUP
// TODO: lookup * .d.js estension to delete
execSync([
  'rimraf typings',
  'rimraf lib/types/index.js',
  ...outputs.map(item => `rimraf ${item}`),
  ...outputs.map(item => `rimraf lib/theme/${item}/css.d.js`)
].join(' && '))