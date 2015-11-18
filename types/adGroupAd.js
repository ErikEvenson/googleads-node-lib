var Backbone = require('backbone');

var AdGroupAd = Backbone.Model.extend({});

var AdGroupAdCollection = Backbone.Collection.extend({
  model: AdGroupAd,
});

module.exports = {
  collection: AdGroupAdCollection,
  model: AdGroupAd
};
