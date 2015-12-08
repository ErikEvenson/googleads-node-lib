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

  self.addAccountLabel = function(clientCustomerId, name, cb) {
    var label = new self.Model({name: name});
    if (!label.isValid()) return cb(new Error(label.validationError));
    self.mutateAdd(clientCustomerId, label, cb);
  };

  self.removeAccountLabel = function(clientCustomerId, id, cb) {
    var label = new self.Model({id: id});
    // if (!label.isValid()) return cb(new Error(label.validationError));
    self.mutateRemove(clientCustomerId, label, cb);
  };

  self.setAccountLabel = function(clientCustomerId, id, name, cb) {
    var label = new self.Model({id: id, name: name});
    if (!label.isValid()) return cb(new Error(label.validationError));
    self.mutateSet(clientCustomerId, label, cb);
  };

  self.parseGetResponse = function(response) {
    if (self.validateOnly) {
      return {
        labels: null
      };
    } else {
      if (response.rval) {
        return {
          labels: new self.Collection(response.rval.labels),
        };
      } else {
        return {};
      }
    }
  };

  self.parseMutateResponse = function(response) {
    return self.parseGetResponse(response);
  };
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
