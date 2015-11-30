var
  _ = require('lodash'),
  builder = require('xmlbuilder');

var AdWordsReport = require('./adWordsReport');
var reportType = 'ADGROUP_PERFORMANCE_REPORT';

function Report(options) {
  var self = this;
  AdWordsReport.call(self, options);

  self.getRdxml = function() {
    var xml = builder.create('root').ele({
      reportDefinition: {
        selector: {
          fields: [
            {'#text': 'CampaignId'},
            {'#text': 'Impressions'},
            {'#text': 'Clicks'},
            {'#text': 'Cost'}
          ],
          predicates: [
            {
              field: 'CampaignStatus',
              operator: 'IN',
              values: [
                {'#text': 'ENABLED'},
                {'#text': 'PAUSED'}
              ]
            }
          ]
        },
        reportName: 'Custom Adgroup Performance Report',
        reportType: reportType,
        dateRangeType: 'LAST_7_DAYS',
        downloadFormat: 'XML'
      }
    });

    // console.log(xml.toString({ pretty: true, indent: '  ', offset: 1, newline: '\n' }));
    return xml.toString();
  };
}

Report.prototype = _.create(AdWordsReport.prototype, {
  'constructor': Report
});

module.exports = (Report);
