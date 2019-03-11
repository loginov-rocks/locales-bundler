const deepAssign = require('deep-assign');
const deepSortObject = require('deep-sort-object');
const fs = require('fs');
const glob = require('glob');
const objectPath = require('object-path');
const path = require('path');

/**
 * Locales bundler.
 * @param {string} source
 * @param {string} pattern
 * @param {string} [omit='']
 * @return {Object} Contents bundled by file names.
 */
module.exports = (source, pattern, omit = '') => {
  const files = glob.sync(path.join(source, pattern));

  const contentsByFileNames = {};

  files.forEach((filePath) => {
    let relativePath = path.relative(source, path.dirname(filePath)).
        replace(new RegExp(omit, 'g'), '');

    // Replace backslashes for Windows paths.
    relativePath = relativePath.replace(/\\/g, '/');
    // Trim slashes.
    relativePath = relativePath.replace(/^\/|\/$/g, '');

    const fileName = path.basename(filePath);

    const content = {};
    const json = JSON.parse(fs.readFileSync(filePath));

    objectPath.set(content, relativePath.replace(/\//g, '.'), json);

    contentsByFileNames[fileName] = contentsByFileNames[fileName] || {};

    deepAssign(contentsByFileNames[fileName], content);
  });

  return deepSortObject(contentsByFileNames);
};
