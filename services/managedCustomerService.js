/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/ManagedCustomerService

*/

var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/managedCustomer');
var links = require('../types/managedCustomerLink');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;
  self.managedCustomerLinkCollection = links.collection;
  self.managedCustomerLink = links.model;

  self.formGetRequest = function(selector) {
    return {serviceSelector: selector.toJSON()};
  };

  // self.getPendingInvitations = function(
  //   clientCustomerId, managerCustomerIds, clientCustomerIds, done) {
  //   self.soapHeader.RequestHeader.clientCustomerId = clientCustomerId;
  //
  //   async.waterfall([
  //     // Get an active access token...
  //     function(cb) {
  //       self.refresh(cb);
  //     },
  //     // Create a SOAP client...
  //     function(credentials, cb) {
  //       self.accessToken = credentials.access_token;
  //       soap.createClient(self.wsdlUrl, cb);
  //     },
  //     // Request AdWords data...
  //     function(adWordsClient, cb) {
  //       self.client = adWordsClient;
  //
  //       self.client.addSoapHeader(
  //         self.soapHeader, self.name, self.namespace, self.xmlns
  //       );
  //
  //       self.client.setSecurity(new soap.BearerSecurity(self.accessToken));
  //
  //       self.client.getPendingInvitations(
  //         {
  //           clientCustomerIds: clientCustomerIds,
  //           managerCustomerIds: managerCustomerIds
  //         },
  //         function(err, rval) {
  //           cb(err, rval, self.client.lastRequest);
  //         }
  //       );
  //     }
  //   ], done);
  // };
  //
  // self.mutateAdd = function(clientCustomerId, operand, done) {
  //   var operations = [{'cm:operator': 'ADD', operand: operand.toJSON()}];
  //   self.mutate(clientCustomerId, operations, 'mutate', done);
  // };
  //
  // self.mutateRemove = function(clientCustomerId, operand, done) {
  //   var operations = [{'cm:operator': 'REMOVE', operand: operand.toJSON()}];
  //   self.mutate(clientCustomerId, operations, 'mutate', done);
  // };
  //
  // self.mutateSet = function(clientCustomerId, operand, done) {
  //   var operations = [{'cm:operator': 'SET', operand: operand.toJSON()}];
  //   self.mutate(clientCustomerId, operations, 'mutate', done);
  // };
  //
  // self.mutateLabel = 'TBD';
  //
  // self.mutateLinkSet = function(clientCustomerId, operand, done) {
  //   var operations = [{'cm:operator': 'SET', operand: operand.toJSON()}];
  //   self.mutate(clientCustomerId, operations, 'mutateLink', done);
  // };
  //
  // self.mutateManager = 'TBD';

  self.parseGetRval = function(rval) {
    return {
      totalNumEntries: rval.rval.totalNumEntries,
      collection: new self.Collection(rval.rval.entries),
      links: new self.managedCustomerLinkCollection(rval.rval.links)
    };
  };

  // self.parseMutateRval = function(rval) {
  //   return {
  //     collection: new self.Collection(rval.rval.value)
  //   };
  // };

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

  self.xmlns = 'https://adwords.google.com/api/adwords/mcm/v201506';
  self.wsdlUrl = self.xmlns + '/ManagedCustomerService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
