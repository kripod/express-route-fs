/*!
 * express-route-fs
 * Copyright(c) 2015 Kristóf Poduszló
 * MIT Licensed
 */

/// <reference path="../typings/tsd.d.ts" />

import path = require('path');
import recursive = require('recursive-readdir');

/**
 Sets up file system-based routing in Express.
 @param {Object} app Express application object.
 @param {Object[]} [options] Options for setting up routes.
 */
function routeFs(app, options?) {
	options = options || {};
	let routerDir = path.resolve(options.routerDir || './routes');

	recursive(routerDir, function(err, files: any[]) {
		if (files === undefined) {
			console.log('Warning: Routes could not be loaded by express-route-fs.');
			return;
		}

		// Loop through the router files
		for (let i = files.length - 1; i >= 0; i--) {
			// Get the absolute and normalized relative path of the router file
			let fileAbsolute = files[i];
			let fileRelative = path.relative(routerDir, fileAbsolute).split(path.sep).join('/');

			// Get the file's relative path without its extension
			let routeName = '/' + fileRelative.slice(0, -'.js'.length);

			// Handle the index files specially
			if (routeName.toLowerCase().substr(-'/index'.length) === '/index') {
				let location = routeName.slice(0, -'/index'.length);
				routeName = location.length > 0 ? location : '/';
			}

			// Define the route
			app.use(routeName, require(fileAbsolute));
		}
	});
};

export = routeFs;
