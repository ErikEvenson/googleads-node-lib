var Backbone = require('backbone');

var DateRange = Backbone.Model.extend({
  defaults: {
    min: '19700101',
    max: '20380101'
  }
});

var DateRangeCollection = Backbone.Collection.extend({
  model: DateRange,
});

module.exports = {
  collection: DateRangeCollection,
  model: DateRange
};
