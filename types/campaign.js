var Backbone = require('backbone');

var Campaign = Backbone.Model.extend({
  validate: function(attrs, options) {
    var validationErrors = [];

    if (!attrs.budget) validationErrors.push(
      Error('budget is required')
    );

    if (validationErrors.length > 0) return validationErrors;
  }
});

var CampaignCollection = Backbone.Collection.extend({
  model: Campaign,
});

module.exports = {
  collection: CampaignCollection,
  model: Campaign
};
