var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  parseString = require('xml2js').parseString,
  pd = require('pretty-data').pd;

gulp.task(
  'adWords:campaignPerformanceReport:total',
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
    var report = new AdWords.CampaignPerformanceReport();

    var fieldNames = [
      // 'Period',
      // 'AccountDescriptiveName',
      // 'Amount',
      'CampaignId',
      'CampaignName',
      // 'CampaignStatus',
      // 'Cost',
      // 'CustomerDescriptiveName',
      // 'Date',
      // 'EndDate',
      // 'Impressions',
      // 'Interactions',
      // 'Month',
      // 'MonthOfYear',
      // 'PrimaryCompanyName',
      // 'Quarter',
      // 'StartDate',
      'TotalCost',
      'Week'
    ];

    var options = {
      clientCustomerId: argv.clientCustomerId,
      fieldNames: fieldNames
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

gulp.task(
  'adWords:campaignPerformanceReport',
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
    var report = new AdWords.CampaignPerformanceReport();

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
