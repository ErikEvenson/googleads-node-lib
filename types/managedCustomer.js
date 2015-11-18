var Backbone = require('backbone');

var ManagedCustomer = Backbone.Model.extend({
  validate: function(attrs, options) {
    var validationErrors = [];

    if (!attrs.currencyCode) validationErrors.push(
      Error('currencyCode required')
    );

    if (!attrs.dateTimeZone) validationErrors.push(
      Error('dateTimeZone required')
    );

    if (!attrs.name) validationErrors.push(Error('name required'));
    if (validationErrors.length > 0) return validationErrors;
  }
});

var ManagedCustomerCollection = Backbone.Collection.extend({
  model: ManagedCustomer,
});

module.exports = {
  collection: ManagedCustomerCollection,
  model: ManagedCustomer
};
