// Copied from material-ui
// https://github.com/callemall/material-ui/blob/master/scripts/copy-files.js
/* eslint-disable no-use-before-define */
import path from 'path';
import fse from 'fs-extra';

const destDir = process.argv[2] || 'dist';

const files = [
  'README.md',
  'LICENSE',
];

Promise.all(
  files.map(file => copyFile(file)),
)
  .then(() => createPackageFile());

function copyFile(file) {
  const destPath = resolveDestPath(file);
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

function resolveDestPath(file) {
  return path.resolve(__dirname, `../${destDir}/`, path.basename(file));
}

function createPackageFile() {
  return new Promise((resolve) => {
    fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  })
    .then(data => JSON.parse(data))
    .then((packageData) => {
      const {
        author,
        version,
        description,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      } = packageData;

      const minimalPackage = {
        name: 'react-render-counter',
        author,
        version,
        description,
        main: './index.js',
        // module: './index.es.js',
        // 'jsnext:main': './index.es.js',
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      };

      return new Promise((resolve) => {
        const destPath = path.resolve(__dirname, `../${destDir}/package.json`);
        const data = JSON.stringify(minimalPackage, null, 2);
        fse.writeFile(destPath, data, (err) => {
          if (err) throw (err);
          console.info(`Created package.json in ${destPath}`);
          resolve();
        });
      });
    });
}
