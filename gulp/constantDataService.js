var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

  gulp.task(
    'adWords:constantDataService:getConstantData',
    'gets Google AdWords constant data',
    function(cb) {
      var argv = require('yargs')
        .choices(
          'type',
          [
            'AgeRangeCriterion',
            'CarrierCriterion',
            'GenderCriterion',
            'LanguageCriterion',
            'MobileDeviceCriterion',
            'OperatingSystemVersionCriterion',
            'ProductBiddingCategoryData',
            // 'UserInterestCriterion',
            'VerticalCriterion'
          ]
        )
        .default(
          'clientCustomerId',
          process.env.ADWORDS_CLIENT_CUSTOMER_ID,
          'clientCustomerId of account'
        )
        .default('countryCode', 'US', 'country code')
        .default('validateOnly', false, 'validate only')
        .demand('type', 'constant data type')
        .argv;

      var AdWords = require('..');

      var service = new AdWords.ConstantDataService()
        .setValidateOnly(argv.validateOnly)
        .setVerbose(true);

      var options = {
        countryCode: argv.countryCode,
        type: argv.type
      };
      service.getConstantData(options, function(err, results) {
        if (err) console.log(err);
        else console.log(JSON.stringify(results, null, 2));
        cb(err);
      });
    }
  );
