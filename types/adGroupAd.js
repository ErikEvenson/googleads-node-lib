/*

API:
https://developers.google.com/adwords/api/docs/reference/v201509
/AdGroupAdService.AdGroupAd

*/

var Backbone = require('backbone');

var AdGroupAd = Backbone.Model.extend({});

var AdGroupAdCollection = Backbone.Collection.extend({
  model: AdGroupAd,
});

module.exports = {
  collection: AdGroupAdCollection,
  model: AdGroupAd
};
