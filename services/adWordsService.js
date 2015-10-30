var
  _ = require('lodash'),
  async = require('async'),
  request = require('request'),
  soap = require('soap');

function AdWordsService(options) {
  if (!options) options = {};

  _.defaults(options, {
    validateOnly: false
  });

  var self = this;
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

  self.mutate = function(clientCustomerId, operations, mutateMethod, done) {
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
        self.client[mutateMethod]({operations: operations}, function(err, rval) {
          if (err) {
            cb(err, rval, self.client.lastRequest);
          } else {
            cb(err, self.parseMutateRval(rval), self.client.lastRequest);
          }
        });
      }
    ], done);
  };

  self.mutateAdd = function(clientCustomerId, operand, done) {
    var operations = [{'operator': 'ADD', operand: operand.toJSON()}];
    self.mutate(clientCustomerId, operations, 'mutate', done);
  };

  self.mutateRemove = function(clientCustomerId, operand, done) {
    var operations = [{'operator': 'REMOVE', operand: operand.toJSON()}];
    self.mutate(clientCustomerId, operations, 'mutate', done);
  };

  self.mutateSet = function(clientCustomerId, operand, done) {
    var operations = [{'operator': 'SET', operand: operand.toJSON()}];
    self.mutate(clientCustomerId, operations, 'mutate', done);
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

  self.query = function(clientCustomerId, query, done) {
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

        self.client.query(
          {query: query},
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

  self.refresh = function(done) {
    var qs = {
      refresh_token: process.env.ADWORDS_REFRESH_TOKEN,
      client_id: process.env.ADWORDS_CLIENT_ID,
      client_secret: process.env.ADWORDS_SECRET,
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
      developerToken: process.env.ADWORDS_DEVELOPER_TOKEN,
      userAgent: 'CallDrive',
      clientCustomerId: process.env.ADWORDS_CLIENT_CUSTOMER_ID,
      validateOnly: self.options.validateOnly
    }
  };
}

module.exports = (AdWordsService);
