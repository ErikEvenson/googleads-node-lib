var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:campaignService:get',
  'gets Google AdWords campaign',
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

    var service = new AdWords.CampaignService({
      validateOnly: argv.validateOnly
    });

    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
      paging: {startIndex: 0, numberResults: 100},
    });

    service.get(argv.clientCustomerId, selector, function(err, results) {
      if (err) console.log(err);
      else console.log(JSON.stringify(results, null, 2));
      cb(err);
    });
  }
);
