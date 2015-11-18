var Backbone = require('backbone');

var SharedBiddingStrategy = Backbone.Model.extend({});

var SharedBiddingStrategyCollection = Backbone.Collection.extend({
  model: SharedBiddingStrategy,
});

module.exports = {
  collection: SharedBiddingStrategyCollection,
  model: SharedBiddingStrategy
};
