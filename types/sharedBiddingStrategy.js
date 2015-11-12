/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/BiddingStrategyService.SharedBiddingStrategy

*/

var Backbone = require('backbone');

var SharedBiddingStrategy = Backbone.Model.extend({});

var SharedBiddingStrategyCollection = Backbone.Collection.extend({
  model: SharedBiddingStrategy,
});

module.exports = {
  collection: SharedBiddingStrategyCollection,
  model: SharedBiddingStrategy
};
