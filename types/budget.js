var Backbone = require('backbone');

var Budget = Backbone.Model.extend({
  validate: function(attrs, options) {
    var validationErrors = [];

    if (parseInt(attrs.amount.microAmount) < 0) validationErrors.push(
      Error('negative budgets not allowed')
    );

    if (validationErrors.length > 0) return validationErrors;
  }
});

var BudgetCollection = Backbone.Collection.extend({
  model: Budget,
});

module.exports = {
  collection: BudgetCollection,
  model: Budget
};
