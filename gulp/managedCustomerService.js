var
  _ = require('lodash'),
  argv = require('yargs').argv,
  async = require('async'),
  gulp = require('gulp'),
  soap = require('soap'),
  utils = require('./utils');

var Service = require('../services/managedCustomerService');
var Model = require('../types/managedCustomer').model;
var Selector = require('../types/selector').model;

gulp.task(
  'adWords:managedCustomerService:get',
  'gets Google AdWords managed customer accounts',
  function(cb) {
    var service = new Service();
    var clientCustomerId = argv.clientCustomerId;

    if (!clientCustomerId) {
      clientCustomerId = process.env.ADWORDS_CLIENT_CUSTOMER_ID;
    }

    var predicates = [];

    var selector = new Selector({
      dateRange: {
        min: '19700101',
        max: '20380101'
      },

      fields: service.selectable,

      ordering: [{
        field: 'Name',
        sortOrder: 'ASCENDING'
      }],

      paging: {
        startIndex: 0,
        numberResults: 100
      },

      predicates: predicates
    });

    if (argv.name) {
      selector.predicates.push({
        field: 'Name',
        operator: 'CONTAINS_IGNORE_CASE',
        values: [argv.name]
      });
    }

    service
      .get(clientCustomerId, selector, function(err, rval, lastRequest) {
        if (!err && argv.excludeHiddenAccounts) {
          var customerIds = rval.links
            .chain()
            .reject(function(link) {
              return link.get('isHidden');
            })
            .map(function(link) {
              return link.get('clientCustomerId');
            })
            .value();

          predicates.push({
            field: 'CustomerId',
            operator: 'IN',
            values: customerIds
          });

          selector.set('predicates', predicates);

          service
            .get(clientCustomerId, selector, function(err, rval, lastRequest) {
              utils.handleSoapResponse(err, rval, lastRequest);
              return cb(null, rval);
            });
        } else {
          utils.handleSoapResponse(err, rval, lastRequest);
          return cb(null, rval);
        }
      });
  },
  {
    options: {
      'clientCustomerId':
        'clientCustomerId (default=CallDrive MCC) of account',
      'excludeHiddenAccounts': 'exclude hidden accounts',
      'name':
        'search for accounts with name (contains case insensitive)'
    }
  }
);
