var
  gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp.task('test', ['test:integration']);

gulp.task(
  'test:integration',
  'run integration tests',
  function(done) {
    gulp.src(['./**/tests/integration/*.spec.js'])
      .pipe(mocha({reporter: 'nyan'}))
      .on('end', done);
  }
);
