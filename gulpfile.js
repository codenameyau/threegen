/*!
 * gulpfile.js
 * MIT License (c) 2014
 *
 * Description:
 * Contains scripts for an automated workflow
 *
 * Installation:
 * (1) Install node.js and gulp globally
 * (2) Run `npm install` to download local node packages
 * (3) Change the settings below to match your project
 *
 * Commands:
 *   gulp         - Generates dist folder for deployment
 *   gulp clean   - Removes dist folder if exists
 *   gulp test    - Runs mocha tests on specified path
 */
'use strict';


/************************
 * Import node packages *
 ************************/
var gulp   = require('gulp');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var mocha  = require('gulp-mocha');
var rev    = require('gulp-rev');


/*****************
 * Gulp Settings *
 *****************/
var PATHS = {
  resources : 'app/assets/js/game/res/**',
  index     : 'app/index.html',
  favicon   : 'app/favicon.ico',
  test      : 'test/engine/**.js',
};

var CONFIG = {
  output   : 'dist/',
  resource : 'assets/js/game/res',
  reporter : 'nyan',
};


/**************
 * Gulp Tasks *
 **************/

// Remove last generated dist folder
gulp.task('clean', function(cb) {
  rimraf(CONFIG.output, cb);
});

// Replace build with concat files in index.html
gulp.task('usemin', ['clean'], function() {
  gulp.src(PATHS.index)
    .pipe(usemin({
      css: [rev()],
      js: [uglify(), rev()],
    }))
    .pipe(gulp.dest(CONFIG.output));
});

// Copy static resources (gulp-imagemin optional)
gulp.task('resources', ['clean'], function() {
  gulp.src(PATHS.favicon)
    .pipe(gulp.dest(CONFIG.output));
  gulp.src(PATHS.resources)
    .pipe(gulp.dest(CONFIG.output + CONFIG.resource));
});

// Run mocha tests
gulp.task('test', function () {
  return gulp.src(PATHS.test, {read: false})
    .pipe(mocha({reporter: CONFIG.reporter}));
});

// Generate dist folder for production
gulp.task('default', ['clean', 'usemin', 'resources']);
