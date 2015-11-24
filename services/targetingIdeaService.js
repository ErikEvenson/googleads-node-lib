var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/targetingIdea');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.parseGetResponse = function(response) {
    if (self.validateOnly) {
      return {
        entries: null,
        totalNumEntries: null
      };
    } else {
      if (response.rval) {
        return {
          entries: new self.Collection(response.rval.entries),
          totalNumEntries: response.rval.totalNumEntries
        };
      } else {
        return {};
      }
    }
  };

  self.selectable = null;
  self.xmlns = 'https://adwords.google.com/api/adwords/o/' + self.version;
  self.wsdlUrl = self.xmlns + '/TargetingIdeaService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
