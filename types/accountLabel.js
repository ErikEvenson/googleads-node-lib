var Backbone = require('backbone');

var AccountLabel = Backbone.Model.extend({
  validate: function(attrs, options) {
    var validationErrors = [];

    if (attrs.name.length > 40) validationErrors.push(
      Error('name is too long - must be less than or equal to 40 characters')
    );

    if (validationErrors.length > 0) return validationErrors;
  }
});

var AccountLabelCollection = Backbone.Collection.extend({
  model: AccountLabel,
});

module.exports = {
  collection: AccountLabelCollection,
  model: AccountLabel
};
