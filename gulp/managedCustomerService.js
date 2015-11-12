var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:managedCustomerService:get',
  'gets Google AdWords managed customer accounts',
  function(cb) {
    var argv = require('yargs')
      .argv;

    var AdWords = require('..');
    var service = new AdWords.ManagedCustomerService();
    var clientCustomerId = process.env.ADWORDS_CLIENT_CUSTOMER_ID;

    var selector = new AdWords.Selector.model({
      dateRange: {min: '19700101', max: '20380101'},
      fields: service.selectable,
      ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
      paging: {startIndex: 0, numberResults: 100},
      predicates: []
    });

    service.get(clientCustomerId, selector, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(results, null, 2));
      }

      cb(err);
    });
  }
);

gulp.task(
  'adwords:managedCustomerService:mutateAdd',
  'adds Google AdWords account',
  function(cb) {
    var argv = require('yargs')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('currencyCode', 'USD', 'currency the account operates in')
      .default(
        'dateTimeZone',
        'America/Chicago',
        'local timezone ID for this client'
      )
      .demand('name', 'name of the client')
      .describe('companyName', 'company name of the account')
      .argv;

    var AdWords = require('..');
    var service = new AdWords.ManagedCustomerService();
    var clientCustomerId = argv.clientCustomerId;
    var Model = require('../types/managedCustomer').model;

    var operand = new Model({
      name: argv.name || null,
      currencyCode: argv.currencyCode || 'USD',
      dateTimeZone: argv.dateTimeZone || 'America/Chicago'
    });

    service.mutateAdd(
      clientCustomerId,
      operand,
      function(err, results) {
        if (err) console.log(err);
        else console.log(JSON.stringify(results, null, 2));
        cb(err);
      }
    );
  }
);
