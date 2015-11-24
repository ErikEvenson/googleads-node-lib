var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap'),
  uuid = require('uuid');

gulp.task(
  'adWords:targetingIdeaService:describe',
  'describe Google AdWords service',
  function(cb) {
    var AdWords = require('..');
    var service = new AdWords.TargetingIdeaService();

    service.getClient(function(err, client) {
      if (err) return cb(err);
      console.log(JSON.stringify(service.description, null, 2));
      return cb(err);
    });
  }
);

gulp.task(
  'adWords:targetingIdeaService:get',
  'gets Google AdWords targeting ideas',
  function(cb) {
    var argv = require('yargs')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.TargetingIdeaService()
      .setValidateOnly(argv.validateOnly)
      .setVerbose(true);

    var selector = new AdWords.Selector.model({
      searchParameters: [
        {
          attributes: {'xsi:type': 'RelatedToUrlSearchParameter'},
          urls: ['www.erikevenson.net/resume']
        }
      ],
      ideaType: 'KEYWORD',
      requestType: 'IDEAS',
      requestedAttributeTypes: [
        'AVERAGE_CPC',
        'CATEGORY_PRODUCTS_AND_SERVICES',
        'COMPETITION',
        'EXTRACTED_FROM_WEBPAGE',
        'IDEA_TYPE',
        'KEYWORD_TEXT',
        'SEARCH_VOLUME',
        'TARGETED_MONTHLY_SEARCHES'
      ],
      paging: {'cm:startIndex': 0, 'cm:numberResults': 100},
      // localeCode:,
      currencyCode: 'USD'
    });

    service.get(argv.clientCustomerId, selector, function(err, results) {
      if (err) return cb(err);
      else console.log(JSON.stringify(results, null, 2));
      return cb(err);
    });
  }
);
