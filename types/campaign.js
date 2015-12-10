var
  Backbone = require('backbone'),
  moment = require('moment');

var Campaign = Backbone.Model.extend({
  validate: function(attrs, options) {
    var now = moment();
    var validationErrors = [];

    // budget
    if (!attrs.budget) {
      validationErrors.push(new Error('budget is required'));
    }

    // endDate
    if (attrs.endDate) {
      if (parseInt(attrs.endDate) > 20380101) {
        validationErrors.push(new Error('end date must be before 20380101'));
      }

      if (parseInt(attrs.endDate) < 19700101) {
        validationErrors.push(new Error('end date must be after 19700101'));
      }
    }

    // startDate
    if (attrs.startDate) {
      if (parseInt(attrs.startDate) > 20380101) {
        validationErrors.push(new Error('start date must be before 20380101'));
      }

      if (parseInt(attrs.startDate) < 19700101) {
        validationErrors.push(new Error('start date must be after 19700101'));
      }
    }

    // combined date
    if (attrs.startDate && attrs.endDate) {
      if (parseInt(attrs.startDate) >= parseInt(attrs.endDate)) {
        validationErrors.push(new Error('start date must be before end date'));
      }
    }

    if (attrs.startDate && !attrs.endDate) {
      if (parseInt(attrs.startDate) >= parseInt(now.format('YYYYMMDD'))) {
        validationErrors.push(new Error('start date must be before end date'));
      }
    }

    if (!attrs.startDate && attrs.endDate) {
      if (parseInt(now.format('YYYYMMDD')) >= parseInt(attrs.endDate)) {
        validationErrors.push(new Error('end date must be after start date'));
      }
    }

    if (!attrs.name) {
      validationErrors.push(new Error('name is required'));
    } else {
      if (
        attrs.name.indexOf('\x00') +
        attrs.name.indexOf('\x0A') +
        attrs.name.indexOf('\x0D') > -1
      ) {
        validationErrors.push(new Error('forbidden characters in name'));
      }
    }

    if (validationErrors.length > 0) return validationErrors;
  }
});

var CampaignCollection = Backbone.Collection.extend({
  model: Campaign,
});

module.exports = {
  collection: CampaignCollection,
  model: Campaign
};
