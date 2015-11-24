var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:adGroupAdService:describe',
  'describe Google AdWords service',
  function(cb) {
    var AdWords = require('..');
    var service = new AdWords.AdGroupAdService();

    service.getClient(function(err, client) {
      if (err) return cb(err);
      console.log(JSON.stringify(service.description, null, 2));
      return cb(err);
    });
  }
);

gulp.task(
  'adWords:adGroupAdService:get',
  'gets Google AdWords adGroupAd',
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

    var service = new AdWords.AdGroupAdService()
      .setValidateOnly(argv.validateOnly)
      .setVerbose(true);

    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      paging: {startIndex: 0, numberResults: 100}
    });

    service.get(argv.clientCustomerId, selector, function(err, results) {
      if (err) return cb(err);
      else console.log(JSON.stringify(results, null, 2));
      return cb(err);
    });
  }
);

gulp.task(
  'adWords:adGroupAdService:upgradeUrl',
  'upgrades URL for Google AdWords ads',
  function(cb) {
    var argv = require('yargs')
      .boolean('validateOnly')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .demand('finalUrl', 'final URL to use')
      .demand('adId', 'adId to use')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.AdGroupAdService()
      .setValidateOnly(argv.validateOnly)
      .setVerbose(true);

    var adUrlUpgrade = new service.AdUrlUpgrade({
      adId: argv.adId,
      finalUrl: argv.finalUrl
    });

    var options = {
      clientCustomerId: argv.clientCustomerId,
      operations: [adUrlUpgrade.toJSON()]
    };

    service.upgradeUrl(
      options,
      function(err, results) {
        if (err) return cb(err);
        else console.log(JSON.stringify(results, null, 2));
        return cb(err);
      }
    );
  }
);
