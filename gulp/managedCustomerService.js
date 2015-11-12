var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:managedCustomerService:findByCustomerId',
  'gets Google AdWords managed customer accounts by customerId',
  function(cb) {
    var argv = require('yargs')
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .demand('customerId', 'customer id')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.ManagedCustomerService({
      validateOnly: argv.validateOnly
    });

    service.findByCustomerId(
      argv.clientCustomerId,
      argv.customerId,
      function(err, results) {
        if (err) console.log(err);
        else console.log(JSON.stringify(results, null, 2));
        cb(err);
      }
    );
  }
);

gulp.task(
  'adWords:managedCustomerService:get',
  'gets Google AdWords managed customer accounts',
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

    var service = new AdWords.ManagedCustomerService({
      validateOnly: argv.validateOnly
    });

    var selector = new AdWords.Selector.model({
      dateRange: {min: '19700101', max: '20380101'},
      fields: service.selectable,
      ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
      paging: {startIndex: 0, numberResults: 100},
      predicates: []
    });

    service.get(argv.clientCustomerId, selector, function(err, results) {
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
  'adWords:managedCustomerService:mutateAdd',
  'adds Google AdWords account',
  function(cb) {
    var argv = require('yargs')
      .boolean('validateOnly')
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
      .default('validateOnly', false, 'validate only')
      .demand('name', 'name of the client')
      .describe('companyName', 'company name of the account')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.ManagedCustomerService({
      validateOnly: argv.validateOnly
    });

    var operand = new service.Model({
      name: argv.name || null,
      currencyCode: argv.currencyCode || 'USD',
      dateTimeZone: argv.dateTimeZone || 'America/Chicago'
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

gulp.task(
  'adWords:managedCustomerService:mutateLinkSet',
  'adds Google AdWords account',
  function(cb) {
    var argv = require('yargs')
      .boolean('validateOnly')
      .default(
        'managerCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('validateOnly', false, 'validate only')
      .demand(
        'clientCustomerId',
        'clientCustomerId of account to set link on'
      )
      .argv;

    var AdWords = require('..');

    var service = new AdWords.ManagedCustomerService({
      validateOnly: argv.validateOnly
    });

    var operand = new service.ManagedCustomerLink({
      clientCustomerId: argv.clientCustomerId,
      isHidden: true,
      managerCustomerId: argv.managerCustomerId
    });

    service.mutateLinkSet(
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
