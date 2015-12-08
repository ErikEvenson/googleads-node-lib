var
  async = require('async'),
  expect = require('expect'),
  uuid = require('uuid');

describe('CampaignService', function() {
  var AdWords = require('../..');
  var service = new AdWords.CampaignService();

  it('should validate model', function() {
    var campaign = new service.Model({
      name: uuid.v4(),
      budget: {budgetId: uuid.v4()},
      advertisingChannelType: 'SEARCH',

      biddingStrategyConfiguration: {
        biddingStrategyName: uuid.v4(),
        biddingStrategyType: 'MANUAL_CPC'
      }
    });

    expect(campaign.isValid()).toEqual(true);
  });

  it('should require a budget', function() {
    var campaign = new service.Model({
      name: uuid.v4(),
      advertisingChannelType: 'SEARCH',

      biddingStrategyConfiguration: {
        biddingStrategyName: uuid.v4(),
        biddingStrategyType: 'MANUAL_CPC'
      }
    });

    expect(campaign.isValid()).toEqual(false);
  });
});
