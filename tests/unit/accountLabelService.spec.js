var
  async = require('async'),
  expect = require('expect'),
  uuid = require('uuid');

describe('AccountLabelService', function() {
  var AdWords = require('../..');
  var service = new AdWords.AccountLabelService();

  it('should validate model', function() {
    var accountLabel = new service.Model({
      name: 'T-' + uuid.v4()
    });

    expect(accountLabel.isValid()).toEqual(true);
  });

  it('should not accept labels with more than 40 characters', function() {
    var accountLabel = new service.Model({
      name: '12345678901234567890123456789012345678901'
    });

    expect(accountLabel.isValid()).toEqual(false);
  });
});
