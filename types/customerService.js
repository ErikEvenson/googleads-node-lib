var Backbone = require('backbone');

var Customer = Backbone.Model.extend({});

var CustomerCollection = Backbone.Collection.extend({
  model: Customer,
});

module.exports = {
  collection: CustomerCollection,
  model: Customer
};
