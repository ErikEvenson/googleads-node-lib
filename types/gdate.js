var Backbone = require('backbone');

var Gdate = Backbone.Model.extend({});

var GdateCollection = Backbone.Collection.extend({
  model: Gdate,
});

module.exports = {
  collection: GdateCollection,
  model: Gdate
};
