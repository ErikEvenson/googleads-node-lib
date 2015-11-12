var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/sharedBiddingStrategy');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.selectable = [
    'BiddingScheme',
    'Id',
    'Name',
    'Status',
    'Type'
  ];

  self.xmlns = 'https://adwords.google.com/api/adwords/cm/v201506';
  self.wsdlUrl = self.xmlns + '/BiddingStrategyService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
