var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  soap = require('soap');

  gulp.task(
    'adWords:accountLabelService:describe',
    'describe Google AdWords service',
    function(cb) {
      var AdWords = require('..');
      var service = new AdWords.AccountLabelService();

      service.getClient(function(err, client) {
        if (err) return cb(err);
        console.log(JSON.stringify(service.description, null, 2));
        return cb(err);
      });
    }
  );

gulp.task(
  'adWords:accountLabelService:get',
  'gets Google AdWords account labels',
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

    var service = new AdWords.AccountLabelService()
      .setValidateOnly(argv.validateOnly)
      .setVerbose(true);

    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      ordering: [{field: 'Name', sortOrder: 'ASCENDING'}]
    });

    service.get(argv.clientCustomerId, selector, function(err, results) {
      if (err) return cb(err);
      else console.log(JSON.stringify(results, null, 2));
      return cb(err);
    });
  }
);

gulp.task(
  'adWords:accountLabelService:addAccountLabel',
  'adds Google AdWords account label',
  function(cb) {
    var argv = require('yargs')
      .boolean('validateOnly')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .demand('name', 'name of the label')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.AccountLabelService()
      .setValidateOnly(argv.validateOnly);

    service.addAccountLabel(
      argv.clientCustomerId,
      argv.name,
      function(err, results) {
        if (err) return cb(err);
        else console.log(JSON.stringify(results, null, 2));
        return cb(err);
      }
    );
  }
);

gulp.task(
  'adWords:accountLabelService:removeAccountLabel',
  'removes Google AdWords account label',
  function(cb) {
    var argv = require('yargs')
      .boolean('validateOnly')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .demand('id', 'id of the label')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.AccountLabelService()
      .setValidateOnly(argv.validateOnly);

    service.removeAccountLabel(
      argv.clientCustomerId,
      argv.id,
      function(err, results) {
        if (err) return cb(err);
        else console.log(JSON.stringify(results, null, 2));
        return cb(err);
      }
    );
  }
);

gulp.task(
  'adWords:accountLabelService:setAccountLabel',
  'sets Google AdWords account label',
  function(cb) {
    var argv = require('yargs')
      .boolean('validateOnly')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .demand('id', 'id of the label')
      .demand('name', 'new name of the label')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.AccountLabelService()
      .setValidateOnly(argv.validateOnly);

    service.setAccountLabel(
      argv.clientCustomerId,
      argv.id,
      argv.name,
      function(err, results) {
        if (err) return cb(err);
        else console.log(JSON.stringify(results, null, 2));
        return cb(err);
      }
    );
  }
);
