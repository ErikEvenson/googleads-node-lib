/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/ManagedCustomerService.ManagedCustomer

*/

var Backbone = require('backbone');

var ManagedCustomer = Backbone.Model.extend({});

var ManagedCustomerCollection = Backbone.Collection.extend({
  model: ManagedCustomer,
});

module.exports = {
  collection: ManagedCustomerCollection,
  model: ManagedCustomer
};
