var Backbone = require('backbone');

var Selector = Backbone.Model.extend({});

var SelectorCollection = Backbone.Collection.extend({
  model: Selector,
});

module.exports = {
  collection: SelectorCollection,
  model: Selector
};
