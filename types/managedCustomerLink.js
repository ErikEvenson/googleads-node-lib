/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/ManagedCustomerService.ManagedCustomerLink

*/

var Backbone = require('backbone');

var ManagedCustomerLink = Backbone.Model.extend({});

var ManagedCustomerLinkCollection = Backbone.Collection.extend({
  model: ManagedCustomerLink,
});

module.exports = {
  collection: ManagedCustomerLinkCollection,
  model: ManagedCustomerLink
};
