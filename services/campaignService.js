var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/campaign');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.selectable = [
    'ActiveViewCpmEnabled',
    'AdServingOptimizationStatus',
    'AdvertisingChannelSubType',
    'AdvertisingChannelType',
    'Amount',
    'BidCeiling',
    'BidType',
    'BiddingStrategyId',
    'BiddingStrategyName',
    'BiddingStrategyType',
    'BudgetId',
    'BudgetName',
    'BudgetReferenceCount',
    'BudgetStatus',
    'DeliveryMethod',
    'Eligible',
    'EndDate',
    'EnhancedCpcEnabled',
    'FrequencyCapMaxImpressions',
    'Id',
    'IsBudgetExplicitlyShared',
    'Labels',
    'Level',
    'Name',
    'Period',
    'PricingMode',
    'RejectionReasons',
    'ServingStatus',
    'Settings',
    'StartDate',
    'Status',
    'TargetContentNetwork',
    'TargetCpa',
    'TargetCpaMaxCpcBidCeiling',
    'TargetCpaMaxCpcBidFloor',
    'TargetGoogleSearch',
    'TargetPartnerSearchNetwork',
    'TargetSearchNetwork',
    'TimeUnit',
    'TrackingUrlTemplate',
    'UrlCustomParameters'
  ];

  self.selectorKey = 'serviceSelector';
  self.xmlns = 'https://adwords.google.com/api/adwords/cm/v201506';
  self.wsdlUrl = self.xmlns + '/CampaignService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
