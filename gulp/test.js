var
  gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp.task('test', ['test:integration', 'test:unit']);

gulp.task(
  'test:integration',
  'run integration tests',
  function(done) {
    var argv = require('yargs')
      .default('grep', null, 'test grep')
      .default('reporter', 'nyan', 'test reporter')
      .argv;

    gulp.src(['./**/tests/integration/*.spec.js'])
      .pipe(mocha({
        grep: argv.grep,
        reporter: argv.reporter
      }))
      .on('end', done);
  }
);

gulp.task(
  'test:unit',
  'run unit tests',
  function(done) {
    var argv = require('yargs')
      .default('grep', null, 'test grep')
      .default('reporter', 'nyan', 'test reporter')
      .argv;

    gulp.src(['./**/tests/unit/*.spec.js'])
      .pipe(mocha({
        grep: argv.grep,
        reporter: argv.reporter
      }))
      .on('end', done);
  }
);
