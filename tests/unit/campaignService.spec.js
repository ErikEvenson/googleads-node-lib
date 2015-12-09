var
  async = require('async'),
  expect = require('expect'),
  moment = require('moment'),
  uuid = require('uuid');

describe('CampaignService', function() {
  var AdWords = require('../..');
  var service = new AdWords.CampaignService();

  var baseCampaign = new service.Model({
    name: uuid.v4(),
    budget: {budgetId: uuid.v4()},
    advertisingChannelType: 'SEARCH',

    biddingStrategyConfiguration: {
      biddingStrategyName: uuid.v4(),
      biddingStrategyType: 'MANUAL_CPC'
    },

    startDate: '19700101',
    endDate: '20380101'
  });

  var now = moment();

  it('should validate model', function() {
    var campaign = baseCampaign.clone();
    expect(campaign.isValid()).toEqual(true);
  });

  describe('budget', function() {
    it('should require a budget', function() {
      var campaign = baseCampaign.clone();
      campaign.unset('budget');
      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });
  });

  describe('startDate', function() {
    it('should be > 19700101', function() {
      var campaign = baseCampaign.clone();
      campaign.set('startDate', '19600101');
      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });

    it('should be < 20380101', function() {
      var campaign = baseCampaign.clone();
      campaign.set('startDate', '20400101');
      expect(campaign.isValid()).toEqual(false);
      // start date will also be after end date
      expect(campaign.validationError.length).toEqual(2);
    });
  });

  describe('endDate', function() {
    it('should be > 19700101', function() {
      var campaign = baseCampaign.clone();
      campaign.set('endDate', '19600101');
      expect(campaign.isValid()).toEqual(false);
      // end date will also be before start date
      expect(campaign.validationError.length).toEqual(2);
    });

    it('should be < 20380101', function() {
      var campaign = baseCampaign.clone();
      campaign.set('endDate', '20400101');
      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });
  });

  describe('combined date range', function() {
    it('should have start date before end date', function() {
      var campaign = baseCampaign.clone();

      campaign.set(
        'startDate',
        moment(now).add(2, 'months').format('YYYYMMDD')
      );

      campaign.set('endDate', moment(now).add(1, 'months').format('YYYYMMDD'));
      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });

    it('should have a start date before default end date', function() {
      var campaign = baseCampaign.clone();

      campaign.set(
        'startDate',
        moment(now).add(1, 'months').format('YYYYMMDD')
      );

      campaign.unset('endDate');
      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });

    it('should have an end date before default start date', function() {
      var campaign = baseCampaign.clone();
      campaign.unset('startDate');

      campaign.set(
        'endDate',
        moment(now).subtract(1, 'months').format('YYYYMMDD')
      );

      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });
  });

  describe('name', function() {
    it('should have a name', function() {
      var campaign = baseCampaign.clone();
      campaign.unset('name');
      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });

    it('should not have forbidden characters', function() {
      var campaign = baseCampaign.clone();
      campaign.set('name', 'test \x00 name');
      expect(campaign.isValid()).toEqual(false);
      expect(campaign.validationError.length).toEqual(1);
    });
  });
});
