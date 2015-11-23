var
  Backbone = require('backbone'),
  DateRange = require('./dateRange'),
  Paging = require('./paging');

var Selector = Backbone.Model.extend({
  defaults: {
    paging: new Paging.model().toJSON()
  }
});

var SelectorCollection = Backbone.Collection.extend({
  model: Selector,
});

module.exports = {
  collection: SelectorCollection,
  model: Selector
};
