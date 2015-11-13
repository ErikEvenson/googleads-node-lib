var Backbone = require('backbone');

var Campaign = Backbone.Model.extend({});

var CampaignCollection = Backbone.Collection.extend({
  model: Campaign,
});

module.exports = {
  collection: CampaignCollection,
  model: Campaign
};
