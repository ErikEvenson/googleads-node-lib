var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/customerService');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.parseGetResponse = function(response) {
    if (self.validateOnly) {
      return {};
    } else {
      if (response.rval) {
        return new self.Collection(response.rval);
      } else {
        return {};
      }
    }
  };

  self.parseQueryResponse = function(response) {
    return self.parseGetResponse(response);
  };

  self.selectable = [
    'customerId',
    'currencyCode',
    'dateTimeZone',
    'descriptiveName',
    'companyName',
    'canManageClients',
    'testAccount',
    'autoTaggingEnabled',
    'conversionTrackingSettings',
    'remarketingSettings',
  ];

  self.xmlns = 'https://adwords.google.com/api/adwords/mcm/' + self.version;
  self.wsdlUrl = self.xmlns + '/CustomerService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
