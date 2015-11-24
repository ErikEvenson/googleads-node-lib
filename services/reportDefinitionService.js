var
  _ = require('lodash'),
  async = require('async'),
  request = require('request'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/reportDefinitionField');
var reportUrl = 'https://adwords.google.com/api/adwords/reportdownload/v201509';


function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.getReport = function(options, done) {
    async.series([
      // get credentials
      self.refresh,
      // get report
      function(cb) {
        var opts = {
          body: '__rdxml=' + encodeURIComponent(options.rdxml),
          headers: {
            Authorization: 'Bearer ' + self.credentials.access_token,
            developerToken: self.options.ADWORDS_DEVELOPER_TOKEN,
            clientCustomerId: options.clientCustomerId,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          url: reportUrl,
        };

        request(opts, done);
      }
    ],
    done);
  };

  self.getReportFields = function(options, done) {
    async.waterfall([
      // get client
      self.getClient,
      // Request AdWords data...
      function(client, cb) {
        self.client.addSoapHeader(
          self.soapHeader, self.name, self.namespace, self.xmlns
        );

        self.client.setSecurity(
          new soap.BearerSecurity(self.credentials.access_token)
        );

        self.client.getReportFields({reportType: 'KEYWORDS_PERFORMANCE_REPORT'}, cb)
      }
    ],
    function(err, response) {
      return done(err, self.parseGetReportFieldsResponse(response));
    });
  };

  self.parseGetReportFieldsResponse = function(response) {
    if (self.options.validateOnly) {
      return {
        rval: null
      };
    } else {
      if (response.rval) {
        return {
          rval: new self.Collection(response.rval)
        };
      } else {
        return {};
      }
    }
  };

  self.selectable = [];
  self.xmlns = 'https://adwords.google.com/api/adwords/cm/' + self.version;
  self.wsdlUrl = self.xmlns + '/ReportDefinitionService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
