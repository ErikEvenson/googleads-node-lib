// require external modules
var
  _ = require('lodash'),
  async = require('async'),
  request = require('request'),
  soap = require('soap');

// define abstract AdWords service
function AdWordsService(options) {
  var self = this;
  // set up rational defaults
  if (!options) options = {};

  _.defaults(options, {
    ADWORDS_CLIENT_ID: process.env.ADWORDS_CLIENT_ID,
    ADWORDS_CLIENT_CUSTOMER_ID: process.env.ADWORDS_CLIENT_CUSTOMER_ID,
    ADWORDS_DEVELOPER_TOKEN: process.env.ADWORDS_DEVELOPER_TOKEN,
    ADWORDS_REFRESH_TOKEN: process.env.ADWORDS_REFRESH_TOKEN,
    ADWORDS_SECRET: process.env.ADWORDS_SECRET,
    ADWORDS_USER_AGENT: process.env.ADWORDS_USER_AGENT,
    validateOnly: false
  });

  // check if all credentials are supplied
  if (
    !options.ADWORDS_CLIENT_ID ||
    !options.ADWORDS_CLIENT_CUSTOMER_ID ||
    !options.ADWORDS_DEVELOPER_TOKEN ||
    !options.ADWORDS_REFRESH_TOKEN ||
    !options.ADWORDS_SECRET ||
    !options.ADWORDS_USER_AGENT
  ) {
    throw(new Error('googleads-node-lib not configured correctly'));
    return null;
  }

  self.options = options;
  self.accessToken = null;
  self.client = null;
  self.name = '';
  self.namespace = 'ns1';

  self.tokenUrl = 'https://www.googleapis.com/oauth2/v3/token';

  self.formGetRequest = function(selector) {
    return {selector: selector.toJSON()};
  };

  self.get = function(clientCustomerId, selector, done) {
    self.soapHeader.RequestHeader.clientCustomerId = clientCustomerId;

    async.waterfall([
      // Get an active access token...
      function(cb) {
        self.refresh(cb);
      },
      // Create a SOAP client...
      function(credentials, cb) {
        self.accessToken = credentials.access_token;
        soap.createClient(self.wsdlUrl, cb);
      },
      // Request AdWords data...
      function(adWordsClient, cb) {
        self.client = adWordsClient;

        self.client.addSoapHeader(
          self.soapHeader, self.name, self.namespace, self.xmlns
        );

        self.client.setSecurity(new soap.BearerSecurity(self.accessToken));

        self.client.get(
          self.formGetRequest(selector),
          function(err, rval) {
            if (err) {
              cb(err, rval, self.client.lastRequest);
            } else {
              cb(err, self.parseGetRval(rval), self.client.lastRequest);
            }
          }
        );
      }
    ], done);
  };

  self.parseGetRval = function(rval) {
    return {
      totalNumEntries: rval.rval.totalNumEntries,
      collection: new self.Collection(rval.rval.entries)
    };
  };

  self.parseMutateRval = function(rval) {
    if (self.options.validateOnly) {
      return {
        partialFailureErrors: null,
        collection: new self.Collection([])
      };
    } else {
      return {
        partialFailureErrors: rval.rval.partialFailureErrors,
        collection: new self.Collection(rval.rval.value)
      };
    }
  };

  self.refresh = function(done) {
    var qs = {
      refresh_token: self.options.ADWORDS_REFRESH_TOKEN,
      client_id: self.options.ADWORDS_CLIENT_ID,
      client_secret: self.options.ADWORDS_SECRET,
      grant_type: 'refresh_token'
    };

    request.post(
      {
        qs: qs,
        url: self.tokenUrl
      },
      function(error, response, body) {
        credentials = JSON.parse(body);
        credentials.issuedAt = Date.now();
        return done(error, credentials);
      }
    );
  };

  self.soapHeader = {
    RequestHeader: {
      developerToken: self.options.ADWORDS_DEVELOPER_TOKEN,
      userAgent: self.options.ADWORDS_USER_AGENT,
      clientCustomerId: self.options.ADWORDS_CLIENT_CUSTOMER_ID,
      validateOnly: self.options.validateOnly
    }
  };
}

module.exports = (AdWordsService);
