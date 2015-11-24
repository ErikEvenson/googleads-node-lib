var Backbone = require('backbone');

var ReportDefinitionField = Backbone.Model.extend({});

var ReportDefinitionFieldCollection = Backbone.Collection.extend({
  model: ReportDefinitionField,
});

module.exports = {
  collection: ReportDefinitionFieldCollection,
  model: ReportDefinitionField
};
