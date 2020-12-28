/* eslint-disable no-console */
import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import * as prettier from 'prettier';

import { processCss } from './linaria';

const scopedPkgs = ['css', 'components', 'theme', 'utils', 'types'] as const;
const pkgs = [...scopedPkgs, 'kmart'] as const;
type PackageName = typeof pkgs[number];

const [_nodePath, _script, versionBump] = process.argv;
const libDir = path.join(process.cwd(), 'lib');
let version = process.env.npm_package_version ?? '';

// es6 syntax (import) and cjs/commonjs syntax (require)
const outputs = ['es6', 'cjs'];

// Bump version if yarn build is run with major, minor or patch
if (versionBump) {
  console.log('Current version:', version);
  execSync(`npm version ${versionBump}`);
  version = require('../package.json').version;
  console.log('New version:', version);
}

const getDepVersion = (packageName: string) => {
  return require('../package.json').devDependencies[packageName];
};

const getPkgPath = (name: string, ...args: string[]) => {
  return path.join(libDir, name, ...args);
};

const pkgVersion = `>=${version}`;

const defaultPkgConfig = {
  version,
  main: 'cjs/index.js',
  module: 'es6/index.js',
  sideEffects: ['*.css'],
  files: ['cjs/', 'es6/', 'typings/', 'LICENSE'],
  typings: './typings',
  author: 'Katherine Martinez',
  license: 'ISC',
  private: false,
  homepage: `https://github.com/kmartinezmedia/kmart`,
  contributors: [
    {
      name: 'Katherine Martinez',
      email: 'kmartinezmedia@gmail.com',
    },
  ],
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org',
  },
};

type PkgConfig = {
  version: string;
  main: string;
  module: string;
  sideEffects: string[] | boolean;
  files: string[];
  typings: string;
  author: string;
  license: string;
  private: boolean;
  homepage: string;
  contributors: object[];
  dependencies: object;
  peerDependencies?: object;
  publishConfig: object;
  typeScriptVersion?: string;
};

// package.json config for each package
const configs: Record<PackageName, PkgConfig> = {
  kmart: {
    ...defaultPkgConfig,
    dependencies: scopedPkgs.reduce((prev, next) => {
      return {
        ...prev,
        [`@kmart/${next}`]: pkgVersion,
      };
    }, {}),
  },
  components: {
    ...defaultPkgConfig,
    dependencies: {
      '@kmart/css': pkgVersion,
      '@kmart/utils': pkgVersion,
      '@kmart/types': pkgVersion,
    },
    peerDependencies: {
      react: '>=16.8.0',
      'react-dom': '>=16.8.0',
    },
  },
  css: {
    ...defaultPkgConfig,
    dependencies: {
      '@kmart/types': pkgVersion,
    },
    peerDependencies: {},
  },
  theme: {
    ...defaultPkgConfig,
    dependencies: {
      '@kmart/css': pkgVersion,
      '@kmart/utils': pkgVersion,
      '@kmart/types': pkgVersion,
    },
    peerDependencies: {
      react: '>=16.8.0',
      'react-dom': '>=16.8.0',
    },
  },
  utils: {
    ...defaultPkgConfig,
    sideEffects: false,
    dependencies: {
      '@kmart/types': pkgVersion,
    },
  },
  types: {
    ...defaultPkgConfig,
    main: '',
    module: '',
    typings: './index.d.ts',
    files: ['index.d.ts'],
    sideEffects: false,
    dependencies: {
      '@types/react': '^16',
      '@types/react-dom': '^16',
      'type-fest': getDepVersion('type-fest'),
    },
    typeScriptVersion: '4.1',
  },
};

const writePrettyFile = (
  outFilePath: string,
  content: string,
  parser: prettier.BuiltInParserName | undefined = 'typescript'
): void => {
  const prettiered = prettier.format(content, {
    parser,
  });
  writeFileSync(outFilePath, prettiered, { encoding: 'utf8', flag: 'w' });
  console.info(`Wrote ${outFilePath}`);
};

// Cleanup old build
if (existsSync(libDir)) {
  execSync('rimraf lib');
}

// Build types to temp typings folder at root
execSync('tsc --emitDeclarationOnly');

// Build temp es6 and cjs folders and copy over to lib
outputs.forEach(output => {
  execSync(
    `BABEL_ENV=${output} npx babel src --out-dir ${output} --extensions .ts,.tsx --copy-files`
  );
  pkgs.forEach(pkg => {
    const ouputPkgDir = `${output}/${pkg}`;
    if (existsSync(ouputPkgDir)) {
      fsExtra.moveSync(`${output}/${pkg}`, `lib/${pkg}/${output}`);
    }
  });

  const cssPkg = getPkgPath('css', output);
  if (existsSync(cssPkg)) {
    processCss(cssPkg);
  }
});

pkgs.forEach(name => {
  // Bail out if dir is not found
  if (!existsSync(getPkgPath(name))) {
    return;
  }

  // Copy temporary typings to typings folder for each package
  if (name === 'types') {
    execSync('rimraf lib/types');
    fsExtra.moveSync(`typings/${name}`, getPkgPath(name));
  } else {
    fsExtra.moveSync(`typings/${name}`, getPkgPath(name, 'typings'));
  }

  let pkgName = `@kmart/${name}`;

  if (name === 'kmart') {
    pkgName = 'kmart';
    const baseTypes = scopedPkgs.map(pkg => `export * from "@kmart/${pkg}";`).join('\n');
    writeFileSync(getPkgPath('kmart/typings/index.d.ts'), `${baseTypes}`);
  }

  const packageData = {
    name: pkgName,
    ...configs[name],
  };

  const pkgJson = JSON.stringify(packageData);
  const pkgJsonPath = getPkgPath(name, 'package.json');
  // Add package.json file for package
  writePrettyFile(pkgJsonPath, pkgJson, 'json');

  // Copy LICENSE to each package
  fsExtra.copySync('LICENSE', getPkgPath(name, 'LICENSE'));

  if (versionBump) {
    execSync(`cd ${getPkgPath(name)} && npm publish --access public`);
  }
});

// CLEANUP
// TODO: lookup * .d.js estension to delete
execSync(
  [
    'rimraf typings',
    'rimraf lib/types/index.js',
    ...outputs.map(item => `rimraf ${item}`),
    ...outputs.map(item => `rimraf lib/theme/${item}/css.d.js`),
  ].join(' && ')
);
