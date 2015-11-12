/*

API:
https://developers.google.com/adwords/api/docs/reference/v201509
/AdGroupCriterionService.AdGroupCriterion

*/

var Backbone = require('backbone');

var AdGroupCriterion = Backbone.Model.extend({});

var AdGroupCriterionCollection = Backbone.Collection.extend({
  model: AdGroupCriterion,
});

module.exports = {
  collection: AdGroupCriterionCollection,
  model: AdGroupCriterion
};
