var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap'),
  uuid = require('uuid');

gulp.task(
  'adWords:budgetService:get',
  'gets Google AdWords budgets',
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

    var service = new AdWords.BudgetService({
      validateOnly: argv.validateOnly
    });

    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      ordering: [{field: 'BudgetName', sortOrder: 'ASCENDING'}],
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
  'adWords:budgetService:mutateAdd',
  'adds Google AdWords budget',
  function(cb) {
    var argv = require('yargs')
      .boolean('validateOnly')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .demand('name', 'name of the budget')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.BudgetService({
      validateOnly: argv.validateOnly
    });

    var operand = new service.Model({
      name: argv.name,
      amount: {microAmount: 10000000},
      status: 'ENABLED'
    });

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
