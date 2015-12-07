var
  async = require('async'),
  expect = require('expect'),
  uuid = require('uuid');

describe('BudgetService', function() {
  var AdWords = require('../..');
  var service = new AdWords.BudgetService();

  it('should provide a service description', function(done) {
    service.getClient(function(err, client) {
      expect(err).toNotExist();
      expect(service.description).toExist();
      return done(err);
    });
  });

  it('should get budgets', function(done) {
    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      ordering: [{field: 'BudgetName', sortOrder: 'ASCENDING'}],
    });

    service.get(
      process.env.ADWORDS_CLIENT_CUSTOMER_ID,
      selector,
      function(err, results) {
        expect(err).toNotExist();
        expect(results.entries).toExist();
        return done(err);
      }
    );
  });

  it('should create, set, and remove a budget', function(done) {
    var budget = null;

    async.series(
      [
        // add the budget
        function(cb) {
          var operand = new service.Model({
            name: uuid.v4(),
            amount: {microAmount: '10000000'},
            status: 'ENABLED'
          });

          service.mutateAdd(
            process.env.ADWORDS_TEST_ACCOUNT_ID,
            operand,
            function(err, results) {
              expect(err).toNotExist();
              expect(results.value).toExist();
              expect(results.value.length).toEqual(1);
              budget = results.value.pop();
              return cb(err, budget);
            }
          );
        },
        // set budget amount
        function(cb) {
          budget.set('amount', {microAmount: '20000000'});

          service.mutateSet(
            process.env.ADWORDS_TEST_ACCOUNT_ID,
            budget,
            function(err, results) {
              expect(err).toNotExist();
              expect(results.value).toExist();
              expect(results.value.length).toEqual(1);
              newBudget = results.value.pop();
              expect(newBudget.get('amount').microAmount).toEqual('20000000');
              return cb(err, newBudget);
            }
          );
        },
        // remove budget
        function(cb) {
          service.mutateRemove(
            process.env.ADWORDS_TEST_ACCOUNT_ID,
            budget,
            function(err, results) {
              expect(err).toNotExist();
              expect(results.value).toExist();
              expect(results.value.length).toEqual(1);
              return cb(err);
            }
          );
        }
      ],
      function(err, results) {
        done(err);
      }
    );
  });
});
