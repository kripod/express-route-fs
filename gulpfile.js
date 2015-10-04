var gulp = require('gulp');
var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var del = require('del');
var merge = require('merge-stream');

var config = {
	inputDir: './src',
	outputDir: './build',

	inputFilesScript: '/**/*.ts'
};

// Determine the environment's type
var isDebug = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

// Don't resolve external modules in production
var tsProject = ts.createProject('tsconfig.json', { noExternalResolve: !isDebug });

gulp.task('clean', function () {
	return del(config.outputDir);
});

var buildTask = function () {
	var tsResult = gulp.src(config.inputDir + config.inputFilesScript)
		.pipe(ts(tsProject));

	if (!isDebug) {
		tsResult.js.pipe(uglify({ preserveComments: 'license' }));
	}

	return merge(
		tsResult.js.pipe(gulp.dest(config.outputDir)).on('error', gutil.log),
		tsResult.dts.pipe(gulp.dest(config.outputDir)).on('error', gutil.log)
	);
}

gulp.task('build', ['clean'], buildTask);

gulp.task('watch', ['build'], function () {
	gulp.watch(config.inputDir + config.inputFilesScript, buildTask);
});

// Define the default task
gulp.task('default', ['build']);

// Define aliases
gulp.task('c', ['clean']);
gulp.task('b', ['build']);
gulp.task('w', ['watch']);
