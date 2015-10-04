# express-route-fs

File system-based approach for handling routes in Express.

[![NPM Version][npm-image]][npm-url] [![Travis CI Build][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/express-route-fs.svg
[npm-url]: https://npmjs.org/package/express-route-fs
[travis-image]: https://img.shields.io/travis/kripod/express-route-fs/master.svg
[travis-url]: https://travis-ci.org/kripod/express-route-fs

## Installation

`$ npm install express-route-fs --save`

## Features

- Automatically load router files from a specifiable directory
- Easily organize and find your routers by using subdirectories for them
- Lightweight API

## Usage

__Syntax:__ `routeFs(app[, options])`

1. Define your routes in a directory

	- It is encouraged to use separate files for each page in order to easily debug routing issues.
	- Subdirectories can be used
		- An `index.js` file of a directory sets the routing base to the directory's path.

2. Initialize the routers automatically

	```js
	var express = require('express');
	var routeFs = require('express-route-fs');

	var app = express();
	routeFs(app, { routerDir: __dirname + '/routes' });
	```

## Options

| Option      | Description                            | Default   |
|-------------|----------------------------------------|-----------|
| `routerDir` | Load router files from this directory. | ./routes/ |
