var
  async = require('async'),
  expect = require('expect'),
  uuid = require('uuid');

describe('BudgetService', function() {
  var AdWords = require('../..');
  var service = new AdWords.BudgetService();

  it('should validate model', function() {
    var budget = new service.Model({
      name: uuid.v4(),
      amount: {microAmount: '10000000'},
      status: 'ENABLED'
    });

    expect(budget.isValid()).toEqual(true);
  });

  it('should not accept negative budgets', function() {
    var budget = new service.Model({
      name: uuid.v4(),
      amount: {microAmount: '-10000000'},
      status: 'ENABLED'
    });

    expect(budget.isValid()).toEqual(false);
  });
});
