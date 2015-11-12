var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/adGroup');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;
  // self.operatorKey = 'cm:operator';

  self.selectable = [
    'ActiveViewCpmEnabled',
    'BidType',
    'BiddingStrategyId',
    'BiddingStrategyName',
    'BiddingStrategySource',
    'BiddingStrategyType',
    'CampaignId',
    'CampaignName',
    'ContentBidCriterionTypeGroup',
    'CpcBid',
    'CpmBid',
    'EnhancedCpcEnabled',
    'ExperimentDataStatus',
    'ExperimentDeltaStatus',
    'ExperimentId',
    'Id',
    'Labels',
    'MaxContentCpcMultiplier',
    'MaxCpcMultiplier',
    'MaxCpmMultiplier',
    'Name',
    'Settings',
    'Status',
    'TargetCpa',
    'TargetCpaBid',
    'TrackingUrlTemplate',
    'UrlCustomParameters'
  ];

  self.selectorKey = 'serviceSelector';
  self.xmlns = 'https://adwords.google.com/api/adwords/cm/v201509';
  self.wsdlUrl = self.xmlns + '/AdGroupService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
