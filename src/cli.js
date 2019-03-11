#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const localesBundler = require('./localesBundler');

const getFlagValue = (argument) => {
  const i = process.argv.indexOf(`-${argument}`);

  if (i === -1) {
    return null;
  }

  return process.argv[i + 1];
};

const omit = getFlagValue('o') || '';
const pattern = getFlagValue('p') || '**/*.json';
const destination = getFlagValue('d') || 'dist';

let source = getFlagValue('s');

if (!source) {
  source = process.argv[2];

  if (!source) {
    throw new Error('Source path is not specified');
  }
}

const contentsByFileNames = localesBundler(path.resolve(source), pattern, omit);

Object.keys(contentsByFileNames).forEach((fileName) => {
  fs.writeFileSync(path.resolve(destination, fileName),
      JSON.stringify(contentsByFileNames[fileName]));
});
