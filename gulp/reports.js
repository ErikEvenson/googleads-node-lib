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
    var service = new AdWords.ReportDefinitionService();

    // need to add some convenience functions to form this xml
    var rdxml = '<reportDefinition xmlns="https://adwords.google.com/api/adwords/cm/v201509">' +
      '<selector>' +
        '<fields>CampaignId</fields>' +
        '<fields>Impressions</fields>' +
        '<fields>Clicks</fields>' +
        '<fields>Cost</fields>' +
        '<predicates>' +
          '<field>CampaignStatus</field>' +
          '<operator>IN</operator>' +
          '<values>ENABLED</values>' +
          '<values>PAUSED</values>' +
        '</predicates>' +
      '</selector>' +
      '<reportName>Custom Adgroup Performance Report</reportName>' +
      '<reportType>ADGROUP_PERFORMANCE_REPORT</reportType>' +
      '<dateRangeType>LAST_7_DAYS</dateRangeType>' +
      '<downloadFormat>XML</downloadFormat>' +
    '</reportDefinition>';

    var options = {
      clientCustomerId: argv.clientCustomerId,
      rdxml: rdxml
    };

    service.getReport(options, function(err, incoming, response) {
      if (err) return cb(err);
      console.log(pd.xml(response));
    });
  }
);
