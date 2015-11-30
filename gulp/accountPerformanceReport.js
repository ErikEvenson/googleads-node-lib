var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  parseString = require('xml2js').parseString,
  pd = require('pretty-data').pd;

gulp.task(
  'adWords:accountPerformanceReport',
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
    var report = new AdWords.AccountPerformanceReport();

    var options = {
      clientCustomerId: argv.clientCustomerId,
    };

    report.getReport(options, function(err, incoming, response) {
      if (err) return cb(err);
      console.log(pd.xml(response));

      // parseString(response, function (err, result) {
      //   console.log(result.report.table[0].row[0]['$']);
      //   cb();
      // });

      cb();
    });
  }
);
