var
  _ = require('lodash');

var AdWordsReport = require('./adWordsReport');

function Report(options) {
  var self = this;
  AdWordsReport.call(self, options);

  self.getRdxml = function() {
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

    return rdxml;
  }
}

Report.prototype = _.create(AdWordsReport.prototype, {
  'constructor': Report
});

module.exports = (Report);
