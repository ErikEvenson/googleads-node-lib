var
  _ = require('lodash'),
  builder = require('xmlbuilder');

var AdWordsReport = require('./adWordsReport');

function Report(options) {
  var self = this;
  self.reportName = 'Ad Group Performance Report';
  self.reportType = 'ADGROUP_PERFORMANCE_REPORT';

  AdWordsReport.call(self, options);

  self.getRdxml = function(options) {
    _.defaults(options, {
      dateRangeType: 'CUSTOM_DATE',
      downloadFormat: 'XML',
      fieldNames: [
        'CampaignId'
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
    });

    var fields = _.map(options.fieldNames, function(fieldName) {
      return {'#text': fieldName};
    });

    var reportRequest = {
      reportDefinition: {
        selector: {
          fields: fields,
          predicates: options.predicates
        },
        reportName: self.reportName,
        reportType: self.reportType,
        dateRangeType: options.dateRangeType,
        downloadFormat: options.downloadFormat
      }
    };

    if (options.dateRangeType == 'CUSTOM_DATE') {
      reportRequest.reportDefinition.selector.dateRange = {
        min: '20150201',
        max: '20150301'
      };
    }

    var xml = builder.create('root').ele(reportRequest);

    // console.log(xml.toString({ pretty: true, indent: '  ', offset: 1, newline: '\n' }));
    return xml.toString();
  };
}

Report.prototype = _.create(AdWordsReport.prototype, {
  'constructor': Report
});

module.exports = (Report);
