var Backbone = require('backbone');

var AdGroupCriterion = Backbone.Model.extend({});

var AdGroupCriterionCollection = Backbone.Collection.extend({
  model: AdGroupCriterion,
});

module.exports = {
  collection: AdGroupCriterionCollection,
  model: AdGroupCriterion
};
