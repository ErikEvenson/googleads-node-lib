var Backbone = require('backbone');

var AdUrlUpgrade = Backbone.Model.extend({});

var AdUrlUpgradeCollection = Backbone.Collection.extend({
  model: AdUrlUpgrade,
});

module.exports = {
  collection: AdUrlUpgradeCollection,
  model: AdUrlUpgrade
};
