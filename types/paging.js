var Backbone = require('backbone');

var Paging = Backbone.Model.extend({
  defaults: {
    startIndex: 0,
    numberResults: 100
  }
});

var PagingCollection = Backbone.Collection.extend({
  model: Paging,
});

module.exports = {
  collection: PagingCollection,
  model: Paging
};
