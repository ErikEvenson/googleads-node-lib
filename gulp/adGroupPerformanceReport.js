var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:reports',
  'Google AdWords reports',
  function(cb) {
    var argv = require('yargs')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .argv;

    var AdWords = require('..');
    var report = new AdWords.AdGroupPerformanceReport();

    var options = {
      clientCustomerId: argv.clientCustomerId
    };

    report.getReport(options, function(err, incoming, response) {
      if (err) return cb(err);
      console.log(pd.xml(response));
    });
  }
);
