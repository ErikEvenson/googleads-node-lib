var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/managedCustomer');
var links = require('../types/managedCustomerLink');

function Service(options) {
  var self = this;
  var Selector = require('../types/selector').model;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;
  self.ManagedCustomerLinkCollection = links.collection;
  self.ManagedCustomerLink = links.model;

  self.findByCustomerId = function(clientCustomerId, customerId, cb) {
    var selector = new Selector({
      fields: ['CustomerId'],

      predicates: [
        {field: 'CustomerId', operator: 'EQUALS', values: customerId}
      ]
    });

    return self.get(clientCustomerId, selector, cb);
  };

  self.mutateLinkSet = function(clientCustomerId, operand, done) {
    if (!operand.isValid()) return done(operand.validationError);
    var operation = {};
    operation[self.operatorKey] = 'SET';
    operation.operand = operand.toJSON();

    var options = {
      clientCustomerId: clientCustomerId,
      mutateMethod: 'mutateLink',
      operations: [operation]
    };

    self.mutate(options, done);
  };

  // why the cm?
  self.operatorKey = 'cm:operator';
  self.mutateRemove = null;
  self.mutateSet = null;

  self.parseGetRval = function(response) {
    return {
      totalNumEntries: response.rval.totalNumEntries,
      collection: new self.Collection(response.rval.entries),
      links: new self.ManagedCustomerLinkCollection(response.rval.links)
    };
  };

  self.parseMutateLinkRval = function(response) {
    if (self.options.validateOnly) {
      return {
        partialFailureErrors: null,
        collection: new self.Collection([])
      };
    } else {
      if (response.rval) {
        return {
          partialFailureErrors: response.rval.partialFailureErrors,
          collection: new self.Collection(response.rval.links)
        };
      } else {
        return {};
      }
    }
  };

  self.selectable = [
    'AccountLabels',
    'CanManageClients',
    'CompanyName',
    'CurrencyCode',
    'CustomerId',
    'DateTimeZone',
    'Name',
    'TestAccount'
  ];

  self.selectorKey = 'serviceSelector';
  self.xmlns = 'https://adwords.google.com/api/adwords/mcm/v201506';
  self.wsdlUrl = self.xmlns + '/ManagedCustomerService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
