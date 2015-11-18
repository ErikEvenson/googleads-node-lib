var Backbone = require('backbone');

var CampaignCriterion = Backbone.Model.extend({});

var CampaignCriterionCollection = Backbone.Collection.extend({
  model: CampaignCriterion,
});

module.exports = {
  collection: CampaignCriterionCollection,
  model: CampaignCriterion
};
