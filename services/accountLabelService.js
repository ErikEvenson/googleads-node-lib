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
  self.pageKey = 'labels';
  self.selectable = ['LabelId', 'LabelName'];
  self.valueKey = 'labels';
  self.xmlns = 'https://adwords.google.com/api/adwords/mcm/' + self.version;
  self.wsdlUrl = self.xmlns + '/AccountLabelService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
