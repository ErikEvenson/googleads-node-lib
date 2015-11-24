var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:biddingStrategyService:describe',
  'describe Google AdWords service',
  function(cb) {
    var AdWords = require('..');
    var service = new AdWords.BiddingStrategyService();

    service.getClient(function(err, client) {
      if (err) return cb(err);
      console.log(JSON.stringify(service.description, null, 2));
      return cb(err);
    });
  }
);

gulp.task(
  'adWords:biddingStrategyService:get',
  'gets Google AdWords BiddingStrategy',
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

    var service = new AdWords.BiddingStrategyService()
      .setValidateOnly(argv.validateOnly)
      .setVerbose(true);

    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      paging: {startIndex: 0, numberResults: 100},
    });

    service.get(argv.clientCustomerId, selector, function(err, results) {
      if (err) return cb(err);
      else console.log(JSON.stringify(results, null, 2));
      return cb(err);
    });
  }
);
