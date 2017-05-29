// Copied from material-ui
// https://github.com/callemall/material-ui/blob/master/scripts/copy-files.js
/* eslint-disable no-use-before-define */
import path from 'path';
import fse from 'fs-extra';
import minPkg from '../config/minimal-package';

const target = process.argv[2] || 'dist';
const destDir = path.resolve(__dirname, `../../${target}/`);

const files = [
  'README.md',
  'LICENSE',
];

function copyFile(file) {
  const destPath = resolveDestPath(path.basename(file));
  return new Promise((resolve) => {
    fse.copy(
      file,
      destPath,
      (err) => {
        if (err) throw err;
        resolve();
      },
    );
  })
    .then(() => console.info(`Copied ${file} to ${destPath}`));
}

function resolveDestPath(fileName) {
  return path.join(destDir, fileName);
}

function createPackageFile() {
  const minimalPackage = {
    ...minPkg,
    main: './index.js',
    // module: './index.es.js',
    // 'jsnext:main': './index.es.js',
  };

  return new Promise((resolve) => {
    const destPath = resolveDestPath('package.json');
    const data = JSON.stringify(minimalPackage, null, 2);
    fse.writeFile(destPath, data, (err) => {
      if (err) throw (err);
      console.info(`Created package.json in ${destPath}`);
      resolve();
    });
  });
}

function main() {
  files.map(copyFile);
  createPackageFile();
}

main();
