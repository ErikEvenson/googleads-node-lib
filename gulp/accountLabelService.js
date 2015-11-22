var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

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
      .setValidateOnly(argv.validateOnly);

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

gulp.task(
  'adWords:accountLabelService:mutateAdd',
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

    var operand = new service.Model({name: argv.name,});

    service.mutateAdd(
      argv.clientCustomerId,
      operand,
      function(err, results) {
        if (err) console.log(err);
        else console.log(JSON.stringify(results, null, 2));
        cb(err);
      }
    );
  }
);

gulp.task(
  'adWords:accountLabelService:mutateRemove',
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

    var operand = new service.Model({id: argv.id,});

    service.mutateRemove(
      argv.clientCustomerId,
      operand,
      function(err, results) {
        if (err) console.log(err);
        else console.log(JSON.stringify(results, null, 2));
        cb(err);
      }
    );
  }
);

gulp.task(
  'adWords:accountLabelService:mutateSet',
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
      .demand('name', 'new name of the label')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.AccountLabelService()
      .setValidateOnly(argv.validateOnly);

    var operand = new service.Model({
      id: argv.id,
      name: argv.name
    });

    service.mutateSet(
      argv.clientCustomerId,
      operand,
      function(err, results) {
        if (err) console.log(err);
        else console.log(JSON.stringify(results, null, 2));
        cb(err);
      }
    );
  }
);
