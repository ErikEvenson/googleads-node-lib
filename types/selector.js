var
  Backbone = require('backbone'),
  DateRange = require('./dateRange'),
  Paging = require('./paging');

var Selector = Backbone.Model.extend({
  defaults: {
    dateRange: new DateRange.model().toJSON(),
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
