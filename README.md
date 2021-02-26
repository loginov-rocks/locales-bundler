# locales-bundler

[![npm](https://img.shields.io/npm/v/locales-bundler)](https://www.npmjs.com/package/locales-bundler)
[![CI](https://github.com/loginov-rocks/locales-bundler/actions/workflows/ci.yml/badge.svg)](https://github.com/loginov-rocks/locales-bundler/actions/workflows/ci.yml)

Script to merge deep hierarchy of JSON files into a flat set of objects (files) containing deep objects inside. 

More "independent" version of the [gulp-locales-bundler](https://github.com/loginov-rocks/gulp-locales-bundler).

Check the [Real Life Example](https://github.com/loginov-rocks/gulp-locales-bundler#real-life-example) to get more
context for this script.

## Quick Start

### Install

Locally to use in runtime:

```sh
npm install locales-bundler
```

Or globally to use in CLI:

```sh
npm install -g locales-bundler
```

### Use

#### Runtime

```js
const localesBundler = require('locales-bundler');

// Gets all JSON files from 'locales' directories under the 'src' path,
// omits the 'locales' directory from the resulting objects (default is '').
const locales = localesBundler('src', 'locales/**/*.json', 'locales');
```

#### CLI

Can be used as part of the build process, writes merged JSON files to the destination dir.

```sh
locales-bundler -s src -p locales/**/*.json -o locales -d dist
```

Where `-s` is source, `-p` is pattern, `-o` is omit and `-d` is destination. 
