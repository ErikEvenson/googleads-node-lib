var
  argv = require('yargs').argv,
  gulp = require('gulp'),
  gutil = require('gulp-util'),

gulp.task(
  'default',
  'default task',
  ['build:install'],
  function() {
    gutil.log('default task');
  },
  {
    options: {
    }
  }
);
