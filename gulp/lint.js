var
  cache = require('gulp-cached'),
  debug = require('debug')(__filename),
  gjslint = require('gulp-gjslint'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  map = require('map-stream'),
  path = require('path');

var beeper = function(file, cb) {
  return map(function(file, cb) {
    if (!file.jshint.success) {
      // console.log('JSHINT fail in '+file.path);
      file.jshint.results.forEach(function(err) {
        if (err) { gutil.beep(); }
      });
    }
    cb(null, file);
  });
};

var jsLintFiles = [
  './**/*.js',

  // Don't lint bower components
  '!**/bower_components/**/*',

  // Don't lint node modules
  '!**/node_modules/**/*',

  // Don't lint coverage results
  '!coverage/**/*'
];

gulp.task(
  'lint',
  'lint project using all linters',
  ['lint:gjslint', 'lint:jshint'],
  function() {
    // Linting...
  },
  {
    options: {}
  }
);

gulp.task(
  'lint:gjslint',
  'lint project using Google linter',
  function() {
    var options = {
      // This flag doesn't seem to work...
      flags: ['--beep', '--nojsdoc']
    };

    return gulp.src(jsLintFiles)
      .pipe(cache('gjslinting'))
      .pipe(gjslint(options))
      .pipe(gjslint.reporter('console'));
  },
  {
    options: {}
  }
);

gulp.task(
  'lint:jshint',
  'lint project using jshint',
  function() {
    return gulp.src(jsLintFiles)
      .pipe(cache('jshinting'))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(beeper());
  },
  {
    options: {}
  }
);
