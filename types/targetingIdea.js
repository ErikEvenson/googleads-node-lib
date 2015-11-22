var Backbone = require('backbone');

var TargetingIdea = Backbone.Model.extend({});

var TargetingIdeaCollection = Backbone.Collection.extend({
  model: TargetingIdea,
});

module.exports = {
  collection: TargetingIdeaCollection,
  model: TargetingIdea
};
