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


  self.formGetRequest = function(selector) {
    return {serviceSelector: selector.toJSON()};
  };

  self.mutateAdd = function(clientCustomerId, operand, done) {
    // why the cm?
    var options = {
      clientCustomerId: clientCustomerId,
      mutateMethod: 'mutate',
      operations: [{'cm:operator': 'ADD', operand: operand.toJSON()}]
    };

    self.mutate(options, done);
  };

  // self.mutateRemove = function(clientCustomerId, operand, done) {
  //   var operations = [{'cm:operator': 'REMOVE', operand: operand.toJSON()}];
  //   self.mutate(clientCustomerId, operations, 'mutate', done);
  // };
  //
  // self.mutateSet = function(clientCustomerId, operand, done) {
  //   var operations = [{'cm:operator': 'SET', operand: operand.toJSON()}];
  //   self.mutate(clientCustomerId, operations, 'mutate', done);
  // };

  self.parseGetRval = function(response) {
    console.log(response);
    return {
      collection: new self.Collection(response.rval.labels)
    };
  };

  self.parseMutateRval = function(response) {
    return {
      collection: new self.Collection(response.rval.labels)
    };
  };

  self.selectable = ['LabelId', 'LabelName'];
  self.xmlns = 'https://adwords.google.com/api/adwords/mcm/v201506';
  self.wsdlUrl = self.xmlns + '/AccountLabelService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
