/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/AccountLabelService.AccountLabel

*/

var Backbone = require('backbone');

var AccountLabel = Backbone.Model.extend({});

var AccountLabelCollection = Backbone.Collection.extend({
  model: AccountLabel,
});

module.exports = {
  collection: AccountLabelCollection,
  model: AccountLabel
};
