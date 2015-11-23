var
  Backbone = require('backbone'),
  Gdate = require('./gdate');

var DateRange = Backbone.Model.extend({
  defaults: {
    min: new Gdate.model({year: 1970, month: 1, day: 1}).toJSON(),
    max: new Gdate.model({year: 2038, month: 1, day: 1}).toJSON()
  }
});

var DateRangeCollection = Backbone.Collection.extend({
  model: DateRange,
});

module.exports = {
  collection: DateRangeCollection,
  model: DateRange
};
