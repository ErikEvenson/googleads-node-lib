var Backbone = require('backbone');

var Budget = Backbone.Model.extend({});

var BudgetCollection = Backbone.Collection.extend({
  model: Budget,
});

module.exports = {
  collection: BudgetCollection,
  model: Budget
};
