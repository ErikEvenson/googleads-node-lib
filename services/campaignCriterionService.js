var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/campaignCriterion');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.selectable = [
    'Address',
    'AgeRangeType',
    'AppId',
    'BidModifier',
    'CampaignId',
    'CarrierCountryCode',
    'CarrierName',
    'ChannelId',
    'ChannelName',
    'ContentLabelType',
    'CriteriaType',
    'DayOfWeek',
    'DeviceName',
    'DeviceType',
    'Dimensions',
    'DisplayName',
    'DisplayType',
    'EndHour',
    'EndMinute',
    'FeedId',
    'GenderType',
    'GeoPoint',
    'Id',
    'IsNegative',
    'KeywordMatchType',
    'KeywordText',
    'LanguageCode',
    'LanguageName',
    'LocationName',
    'ManufacturerName',
    'MatchingFunction',
    'MobileAppCategoryId',
    'OperatingSystemName',
    'OperatorType',
    'OsMajorVersion',
    'OsMinorVersion',
    'Parameter',
    'ParentLocations',
    'Path',
    'PlacementUrl',
    'PlatformName',
    'RadiusDistanceUnits',
    'RadiusInUnits',
    'StartHour',
    'StartMinute',
    'TargetingStatus',
    'UserInterestId',
    'UserInterestName',
    'UserInterestParentId',
    'UserListId',
    'UserListMembershipStatus',
    'UserListName',
    'VerticalId',
    'VerticalParentId',
    'VideoId',
    'VideoName'
  ];

  self.selectorKey = 'serviceSelector';
  self.xmlns = 'https://adwords.google.com/api/adwords/cm/v201509';
  self.wsdlUrl = self.xmlns + '/CampaignCriterionService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
