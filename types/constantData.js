var Backbone = require('backbone');

var ConstantData = Backbone.Model.extend({});

var ConstantDataCollection = Backbone.Collection.extend({
  model: ConstantData,
});

module.exports = {
  collection: ConstantDataCollection,
  model: ConstantData
};
