var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var types = require('../types/constantData');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.get = null;

  self.getConstantData = function(type, done) {
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

        switch (type) {
          case 'AgeRangeCriterion':
            self.client.getAgeRangeCriterion(cb);
            break;
          case 'CarrierCriterion':
            self.client.getCarrierCriterion(cb);
            break;
          case 'GenderCriterion':
            self.client.getGenderCriterion(cb);
            break;
          case 'LanguageCriterion':
            self.client.getLanguageCriterion(cb);
            break;
          case 'MobileDeviceCriterion':
            self.client.getMobileDeviceCriterion(cb);
            break;
          case 'OperatingSystemVersionCriterion':
            self.client.getOperatingSystemVersionCriterion(cb);
            break;
          // case 'ProductBiddingCategoryData':
          //   self.client.getProductBiddingCategoryData(cb);
          //   break;
          // case 'UserInterestCriterion':
          //   self.client.getUserInterestCriterion(cb);
          //   break;
          case 'VerticalCriterion':
            self.client.getVerticalCriterion(cb);
            break;
          default:
            cb(new Error('unrecognized constant data type'));
        }
      }
    ],
    function(err, response) {
      return done(err, self.parseGetConstantDataRval(response));
    });
  };

  self.mutate = null;
  self.mutateAdd = null;
  self.mutateRemove = null;
  self.mutateSet = null;

  self.parseGetConstantDataRval = function(response) {
    if (self.options.validateOnly) {
      return {
        totalNumEntries: null,
        collection: null
      };
    } else {
      if (response.rval) {
        return {
          totalNumEntries: response.rval.length,
          collection: new self.Collection(response.rval)
        };
      } else {
        return {};
      }
    }
  };

  self.selectable = [];
  self.selectorKey = 'serviceSelector';
  self.xmlns = 'https://adwords.google.com/api/adwords/cm/v201509';
  self.wsdlUrl = self.xmlns + '/ConstantDataService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
