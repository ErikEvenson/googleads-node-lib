/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/AccountLabelService.AccountLabel

*/

var Backbone = require('backbone');

var AdGroup = Backbone.Model.extend({});

var AdGroupCollection = Backbone.Collection.extend({
  model: AdGroup,
});

module.exports = {
  collection: AdGroupCollection,
  model: AdGroup
};
