/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/AccountLabelService

*/

var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/accountLabel');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;
  self.operatorKey = 'cm:operator';
  self.rvalKey = 'labels';
  self.selectable = ['LabelId', 'LabelName'];
  self.selectorKey = 'serviceSelector';
  self.xmlns = 'https://adwords.google.com/api/adwords/mcm/v201506';
  self.wsdlUrl = self.xmlns + '/AccountLabelService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
