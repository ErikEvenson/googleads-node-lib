var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/adGroupAd');
var adUrlUpgrades = require('../types/adUrlUpgrade');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;
  self.AdUrlUpgradeCollection = adUrlUpgrades.collection;
  self.AdUrlUpgrade = adUrlUpgrades.model;

  self.parseGetResponse = function(response) {
    if (self.validateOnly) {
      return {
        entries: null
      };
    } else {
      if (response.rval) {
        return {
          entries: new self.Collection(response.rval.entries),
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

  self.parseUpgradeUrlResponse = function(response) {
    if (self.validateOnly) {
      return {
        rval: null
      };
    } else {
      if (response.rval) {
        return {
          rval: new self.Collection(response.rval)
        };
      } else {
        return {};
      }
    }
  };

  self.selectable = [
    'AdGroupAdDisapprovalReasons',
    'AdGroupAdTrademarkDisapproved',
    'AdGroupCreativeApprovalStatus',
    'AdGroupId',
    'AdvertisingId',
    'CallOnlyAdBusinessName',
    'CallOnlyAdCallTracked',
    'CallOnlyAdConversionTypeId',
    'CallOnlyAdCountryCode',
    'CallOnlyAdDescription1',
    'CallOnlyAdDescription2',
    'CallOnlyAdDisableCallConversion',
    'CallOnlyAdPhoneNumber',
    'CallOnlyAdPhoneNumberVerificationUrl',
    'CreationTime',
    'CreativeFinalAppUrls',
    'CreativeFinalMobileUrls',
    'CreativeFinalUrls',
    'CreativeTrackingUrlTemplate',
    'CreativeUrlCustomParameters',
    'Description1',
    'Description2',
    'DevicePreference',
    'Dimensions',
    'DisplayUrl',
    'ExpandingDirections',
    'ExperimentDataStatus',
    'ExperimentDeltaStatus',
    'ExperimentId',
    'FileSize',
    'Headline',
    'Height',
    'Id',
    'ImageCreativeName',
    'IndustryStandardCommercialIdentifier',
    'IsCookieTargeted',
    'IsTagged',
    'IsUserInterestTargeted',
    'Labels',
    'MediaId',
    'MimeType',
    'PromotionLine',
    'ReadyToPlayOnTheWeb',
    'ReferenceId',
    'RichMediaAdCertifiedVendorFormatId',
    'RichMediaAdDuration',
    'RichMediaAdImpressionBeaconUrl',
    'RichMediaAdName',
    'RichMediaAdSnippet',
    'RichMediaAdSourceUrl',
    'RichMediaAdType',
    'SourceUrl',
    'Status',
    'TemplateAdDuration',
    'TemplateAdName',
    'TemplateAdUnionId',
    'TemplateElementFieldName',
    'TemplateElementFieldText',
    'TemplateElementFieldType',
    'TemplateId',
    'TemplateOriginAdId',
    'Trademarks',
    'UniqueName',
    'Url',
    'Urls',
    'VideoTypes',
    'Width',
    'YouTubeVideoIdString'
  ];

  self.upgradeUrl = function(options, done) {
    self.soapHeader.RequestHeader.clientCustomerId = options.clientCustomerId;

    async.waterfall([
      // get client
      self.getClient,
      // Request AdWords data...
      function(client, cb) {
        self.client.addSoapHeader(
          self.soapHeader, self.name, self.namespace, self.xmlns
        );

        self.client.setSecurity(
          new soap.BearerSecurity(self.credentials.access_token)
        );

        self.client.upgradeUrl({operations: options.operations}, cb);
      }
    ],
    function(err, response) {
      return done(err, self.parseUpgradeUrlResponse(response));
    });
  };

  self.xmlns = 'https://adwords.google.com/api/adwords/cm/' + self.version;
  self.wsdlUrl = self.xmlns + '/AdGroupAdService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
