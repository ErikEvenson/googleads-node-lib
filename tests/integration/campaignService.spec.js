var
  async = require('async'),
  expect = require('expect'),
  uuid = require('uuid');

describe('CampaignService', function() {
  var AdWords = require('../..');
  var factories = require('./factories');
  var budgetService = new AdWords.BudgetService();
  var service = new AdWords.CampaignService();

  it('should provide a service description', function(done) {
    service.getClient(function(err, client) {
      expect(err).toNotExist();
      expect(service.description).toExist();
      return done(err);
    });
  });

  it('should get campaigns', function(done) {
    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
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

  it('should create, set, and remove a campaign', function(done) {
    var budget = null;
    var campaign = null;

    async.series(
      [
        // get a budget
        function(cb) {
          factories.budgetFactory({}, function(err, result) {
            if (err) return cb(err);
            budget = result;
            return cb(err);
          });
        },
        // add the campaign
        function(cb) {
          var operand = new service.Model({
            name: 'TEST-' + uuid.v4(),
            budget: {budgetId: budget.get('budgetId')},
            advertisingChannelType: 'SEARCH',

            biddingStrategyConfiguration: {
              biddingStrategyName: uuid.v4(),
              biddingStrategyType: 'MANUAL_CPC'
            }
          });

          service.mutateAdd(
            process.env.ADWORDS_TEST_ACCOUNT_ID,
            operand,
            function(err, results) {
              expect(err).toNotExist();
              expect(results.value).toExist();
              expect(results.value.length).toEqual(1);
              campaign = results.value.pop();
              return cb(err, campaign);
            }
          );
        },
        // set campaign name
        function(cb) {
          var newName = 'TEST-' + uuid.v4();
          campaign.set('name', newName);

          service.mutateSet(
            process.env.ADWORDS_TEST_ACCOUNT_ID,
            campaign,
            function(err, results) {
              expect(err).toNotExist();
              expect(results.value).toExist();
              expect(results.value.length).toEqual(1);
              newCampaign = results.value.pop();
              expect(newCampaign.get('name')).toEqual(newName);
              return cb(err);
            }
          );
        },
        // remove campaign
        function(cb) {
          campaign.set('status', 'REMOVED');

          service.mutateSet(
            process.env.ADWORDS_TEST_ACCOUNT_ID,
            campaign,
            function(err, results) {
              expect(err).toNotExist();
              expect(results.value).toExist();
              expect(results.value.length).toEqual(1);
              return cb(err);
            }
          );
        },
        // clean up
        function(cb) {
          budgetService.mutateRemove(
            process.env.ADWORDS_TEST_ACCOUNT_ID,
            budget,
            cb
          );
        }
      ],
      function(err, results) {
        done(err);
      }
    );
  });
});
