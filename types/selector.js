/*

API:
https://developers.google.com/adwords/api/docs/reference/v201506
/AdCustomizerFeedService.Selector

*/

var Backbone = require('backbone');

var Selector = Backbone.Model.extend({});

var SelectorCollection = Backbone.Collection.extend({
  model: Selector,
});

module.exports = {
  collection: SelectorCollection,
  model: Selector
};
