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

  self.parseGetResponse = function(response) {
    if (self.validateOnly) {
      return {
        entries: null
      };
    } else {
      if (response.rval) {
        return {
          entries: new self.Collection(response.rval.entries)
        };
      } else {
        return {};
      }
    }
  };

  self.parseMutateResponse = function(response) {
    if (self.validateOnly) {
      return {
        partialFailureErrors: null,
        value: null
      };
    } else {
      if (response.rval) {
        return {
          partialFailureErrors: response.rval.partialFailureErrors,
          value: new self.Collection(response.rval.value)
        };
      } else {
        return {};
      }
    }
  };

  self.parseQueryResponse = function(response) {
    return self.parseGetResponse(response);
  };

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

  self.xmlns = 'https://adwords.google.com/api/adwords/cm/' + self.version;
  self.wsdlUrl = self.xmlns + '/CampaignCriterionService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
