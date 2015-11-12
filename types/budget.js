/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/BudgetService.Budget

*/

var Backbone = require('backbone');

var Budget = Backbone.Model.extend({});

var BudgetCollection = Backbone.Collection.extend({
  model: Budget,
});

module.exports = {
  collection: BudgetCollection,
  model: Budget
};
