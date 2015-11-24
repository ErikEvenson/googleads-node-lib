var
  _ = require('lodash'),
  async = require('async'),
  soap = require('soap');

var AdWordsService = require('./adWordsService');
var Selector = require('../types/selector');
var types = require('../types/constantData');

function Service(options) {
  var self = this;
  AdWordsService.call(self, options);
  self.Collection = types.collection;
  self.Model = types.model;

  self.get = null;

  self.getConstantData = function(options, done) {
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

        switch (options.type) {
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
          case 'ProductBiddingCategoryData':
            var selector = new Selector.model({
              predicates: [
                {
                  field: 'Country',
                  operator: 'EQUALS',
                  values: options.countryCode
                }
              ]
            });

            var request = {};
            request.selector = selector.toJSON();

            self.client.getProductBiddingCategoryData(request, cb);
            break;
          // case 'UserInterestCriterion':
          //   // not really a selector, but...
          //   var userInterestTaxonomyType = new Selector.model({
          //     userInterestTaxonomyType: 'BRAND'
          //   });
          //
          //   var request = {}
          //   request.userInterestTaxonomyType = userInterestTaxonomyType.toJSON();
          //   self.client.getUserInterestCriterion(request, cb);
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

  self.selectable = [];
  self.xmlns = 'https://adwords.google.com/api/adwords/cm/' + self.version;
  self.wsdlUrl = self.xmlns + '/ConstantDataService?wsdl';
}

Service.prototype = _.create(AdWordsService.prototype, {
  'constructor': Service
});

module.exports = (Service);
