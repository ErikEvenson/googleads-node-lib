// require external modules
var
  _ = require('lodash'),
  async = require('async'),
  builder = require('xmlbuilder'),
  request = require('request');

var AdWordsObject = require('../adWordsObject');

// define abstract AdWords report
function AdWordsReport(options) {
  var self = this;
  AdWordsObject.call(self, options);

  self.getRdxml = function(opts) {
    _.defaults(opts, {
      dateRangeType: 'CUSTOM_DATE',
      dateMin: '19700101',
      dateMax: '20380101',
      downloadFormat: 'XML',
      fieldNames: self.defaultFieldNames
    });

    var fields = _.map(options.fieldNames, function(fieldName) {
      return {'#text': fieldName};
    });

    var reportRequest = {
      reportDefinition: {
        selector: {
          fields: fields
        },
        reportName: self.reportName,
        reportType: self.reportType,
        dateRangeType: opts.dateRangeType,
        downloadFormat: opts.downloadFormat
      }
    };

    if (options.predicates) {
      reportRequest.reportDefinition.selector.predicates = opts.predicates;
    }

    if (options.dateRangeType == 'CUSTOM_DATE') {
      reportRequest.reportDefinition.selector.dateRange = {
        min: opts.dateMin,
        max: opts.dateMax
      };
    }

    var xml = builder.create('root').ele(reportRequest);

    // console.log(xml.toString({ pretty: true, indent: '  ', offset: 1, newline: '\n' }));
    return xml.toString();
  };

  self.reportUrl = 'https://adwords.google.com/api/adwords/reportdownload/' +
    self.version;

  self.getReport = function(options, done) {
    async.series([
      // get credentials
      self.refresh,
      // get report
      function(cb) {
        var rdxml = self.getRdxml(options);

        var opts = {
          body: '__rdxml=' + encodeURIComponent(rdxml),
          headers: {
            Authorization: 'Bearer ' + self.credentials.access_token,
            developerToken: self.options.ADWORDS_DEVELOPER_TOKEN,
            clientCustomerId: options.clientCustomerId,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          url: self.reportUrl,
        };

        request(opts, done);
      }
    ],
    done);
  };

  self.getReportFields = function(done) {
    var ReportDefinitionService = require('../services/reportDefinitionService');
    var service = new ReportDefinitionService();
    var options = {reportType: self.reportType};
    service.getReportFields(options, done);
  };

  self.getRdxml = function(options) {
    _.defaults(options, {
      dateRangeType: 'CUSTOM_DATE',
      dateMin: '19700101',
      dateMax: '20380101',
      downloadFormat: 'XML',
      fieldNames: self.defaultFieldNames
    });

    var fields = _.map(options.fieldNames, function(fieldName) {
      return {'#text': fieldName};
    });

    var reportRequest = {
      reportDefinition: {
        selector: {
          fields: fields
        },
        reportName: self.reportName,
        reportType: self.reportType,
        dateRangeType: options.dateRangeType,
        downloadFormat: options.downloadFormat
      }
    };

    if (options.predicates) {
      reportRequest.reportDefinition.selector.predicates = options.predicates;
    }

    if (options.dateRangeType == 'CUSTOM_DATE') {
      reportRequest.reportDefinition.selector.dateRange = {
        min: options.dateMin,
        max: options.dateMax
      };
    }

    var xml = builder.create('root').ele(reportRequest);

    // console.log(xml.toString({ pretty: true, indent: '  ', offset: 1, newline: '\n' }));
    return xml.toString();
  };
}

AdWordsReport.prototype = _.create(AdWordsObject.prototype, {
  'constructor': AdWordsReport
});

module.exports = (AdWordsReport);
