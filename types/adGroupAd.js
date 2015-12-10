var Backbone = require('backbone');

var AdGroupAd = Backbone.Model.extend({
  // Add validation of ad copy text
  // - length
  // - no abbreviations
  // - no punctuation
});

var AdGroupAdCollection = Backbone.Collection.extend({
  model: AdGroupAd,
});

module.exports = {
  collection: AdGroupAdCollection,
  model: AdGroupAd
};
