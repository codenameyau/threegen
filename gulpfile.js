/*!
 * ThreeGen - gulpfile.js
 * codenameyau.github.io
 * MIT License (c) 2014
 *
 * Description: Generates dist folder for deployment
 *
 * Run: gulp
 */
'use strict';


// Import node packages
var gulp = require('gulp');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');

// File paths
var PATHS = {
  resources : 'app/assets/js/game/res/**',
  index : 'app/index.html',
  favicon : 'app/favicon.ico',
};


// Remove last generated dist folder
gulp.task('clean', function(cb) {
  rimraf('dist/', cb);
});

// Replace build with concat files in index.html
gulp.task('usemin', ['clean'], function() {
  gulp.src(PATHS.index)
    .pipe(usemin({
      css: [rev()],
      js: [uglify(), rev()],
    }))
    .pipe(gulp.dest('dist/'));
});

// Copy game resources (gulp-imagemin optional)
gulp.task('resources', ['clean'], function() {
  gulp.src(PATHS.favicon)
    .pipe(gulp.dest('dist/'));
  gulp.src(PATHS.resources)
    .pipe(gulp.dest('dist/assets/js/game/res'));
});

// Generate dist folder for production
gulp.task('default', ['clean', 'usemin', 'resources']);
