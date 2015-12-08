var
  _ = require('lodash'),
  uuid = require('uuid');

var AdWords = require('../..');
var budgetService = new AdWords.BudgetService();

module.exports = {
  budgetFactory: function(options, done) {
    _.defaults(options, {
      adWordsTestAccountId: process.env.ADWORDS_TEST_ACCOUNT_ID,
      amount: {microAmount: '10000000'},
      name: 'TEST-' + uuid.v4(),
      status: 'ENABLED'
    });

    var operand = new budgetService.Model({
      name: options.name,
      amount: options.amount,
      status: options.status
    });

    budgetService.mutateAdd(
      options.adWordsTestAccountId,
      operand,
      function(err, results) {
        if (err) return done(err);
        return done(err, results.value.pop());
      }
    );
  }
};
