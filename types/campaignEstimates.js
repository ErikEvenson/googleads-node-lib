var Backbone = require('backbone');

var CampaignEstimate = Backbone.Model.extend({});

var CampaignEstimateCollection = Backbone.Collection.extend({
  model: CampaignEstimate,
});

module.exports = {
  collection: CampaignEstimateCollection,
  model: CampaignEstimate
};
