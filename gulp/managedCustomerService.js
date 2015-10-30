var
  _ = require('lodash'),
  argv = require('yargs').argv,
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:managedCustomerService:get',
  'gets Google AdWords managed customer accounts',
  function(cb) {
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

    service.get(clientCustomerId, selector, function(err, rval, lastRequest) {
      if (err) {
        console.log(err);
      } else {
        console.log('REQUEST:');
        console.log(pd.xml(lastRequest));
        console.log('\nRESPONSE:');
        console.log(JSON.stringify(rval, null, 2));
      }
    });
  }
);
