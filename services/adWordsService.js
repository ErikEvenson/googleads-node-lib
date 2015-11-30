// require external modules
var
  _ = require('lodash'),
  async = require('async'),
  pd = require('pretty-data').pd,
  request = require('request'),
  soap = require('soap');

var AdWordsObject = require('../adWordsObject');

// define abstract AdWords service
function AdWordsService(options) {
  var self = this;
  AdWordsObject.call(self, options);

  _.defaults(self.options, {
    validateOnly: false,
  });

  self.client = null;
  self.name = '';
  self.namespace = 'ns1';
  self.operatorKey = 'operator';
  self.validateOnly = self.options.validateOnly;

  self.formGetRequest = function(selector) {
    var request = {};
    var getMethod = self.description[self.name][self.port].get;

    if (_.keys(getMethod.input).indexOf('selector') > -1) {
      request.selector = selector.toJSON();
    } else if (_.keys(getMethod.input).indexOf('serviceSelector') > -1) {
      request.serviceSelector = selector.toJSON();
    }

    return request;
  };

  self.getClient = function(done) {
    async.waterfall([
      // get an active access token...
      function(cb) {self.refresh(cb);},
      // create a SOAP client...
      function(cb) {
        if (self.client) {
          // behave async
          setTimeout(function() {cb(null, self.client);}, 0);
          return;
        } else {
          soap.createClient(self.wsdlUrl, function(err, client) {
            self.client = client;

            // add some event handling on the client
            self.client.on('request', function(request) {
              if (self.verbose) {
                console.log('REQUEST:\n', pd.xml(request), '\n');
              }
            });

            self.client.on('response', function(response) {
              if (self.verbose) {
                console.log('RESPONSE:\n', pd.xml(response), '\n');
              }
            });

            self.client.on('soapError', function(error) {
              console.log('SOAP ERROR:\n', pd.xml(error.body), '\n');
            });

            // grab some metadata out of the WSDL
            self.description = self.client.describe();
            self.name = _.keys(self.description)[0];
            self.port = _.keys(self.description[self.name])[0];
            self.methods = _.keys(self.description[self.name][self.port]);

            // return the client or an error
            cb(err, self.client);
          });
          return;
        }
      }
    ], done);
  };

  self.get = function(clientCustomerId, selector, done) {
    self.soapHeader.RequestHeader.clientCustomerId = clientCustomerId;

    async.waterfall([
      // get client
      self.getClient,
      // Request AdWords data...
      function(client, cb) {
        if (self.methods.indexOf('get') == -1) {
          return done(new Error('get method does not exist on ' + self.name));
        }

        self.client.addSoapHeader(
          self.soapHeader, self.name, self.namespace, self.xmlns
        );

        self.client.setSecurity(
          new soap.BearerSecurity(self.credentials.access_token)
        );

        self.client.get(self.formGetRequest(selector), cb);
      }
    ],
    function(err, response) {
      return done(err, self.parseGetResponse(response));
    });
  };

  self.mutate = function(options, done) {
    _.defaults(options, {
      parseMethod: self.parseMutateResponse
    });

    self.soapHeader.RequestHeader.clientCustomerId = options.clientCustomerId;

    async.waterfall([
      // get client
      self.getClient,
      // Request AdWords data...
      function(client, cb) {
        if (self.methods.indexOf('mutate') == -1) {
          return done(
            new Error('mutate method does not exist on ' + self.name)
          );
        }

        self.client.addSoapHeader(
          self.soapHeader, self.name, self.namespace, self.xmlns
        );

        self.client.setSecurity(
          new soap.BearerSecurity(self.credentials.access_token)
        );

        self.client[options.mutateMethod]({operations: options.operations}, cb);
      }
    ],
    function(err, response) {
      return done(err, options.parseMethod(response));
    });
  };

  self.mutateAdd = function(clientCustomerId, operand, done) {
    if (!operand.isValid()) return done(operand.validationError);
    var operation = {};
    operation[self.operatorKey] = 'ADD';
    operation.operand = operand.toJSON();

    var options = {
      clientCustomerId: clientCustomerId,
      mutateMethod: 'mutate',
      operations: [operation]
    };

    self.mutate(options, done);
  };

  self.mutateRemove = function(clientCustomerId, operand, done) {
    var operation = {};
    operation[self.operatorKey] = 'REMOVE';
    operation.operand = operand.toJSON();

    var options = {
      clientCustomerId: clientCustomerId,
      mutateMethod: 'mutate',
      operations: [operation]
    };

    self.mutate(options, done);
  };

  self.mutateSet = function(clientCustomerId, operand, done) {
    if (!operand.isValid()) return done(operand.validationError);
    var operation = {};
    operation[self.operatorKey] = 'SET';
    operation.operand = operand.toJSON();

    var options = {
      clientCustomerId: clientCustomerId,
      mutateMethod: 'mutate',
      operations: [operation]
    };

    self.mutate(options, done);
  };

  self.parseMutateResponse = function(response) {
    throw new Error('parse mutate response not configured');
  };

  self.parseGetResponse = function(response) {
    throw new Error('parse get response not configured');
  };

  self.parseQueryResponse = function(response) {
    throw new Error('parse query response not configured');
  };

  self.query = function(clientCustomerId, query, done) {
    self.soapHeader.RequestHeader.clientCustomerId = clientCustomerId;

    async.waterfall([
      // get client
      self.getClient,
      // Request AdWords data...
      function(client, cb) {
        if (self.methods.indexOf('query') == -1) {
          return done(
            new Error('query method does not exist on ' + self.name)
          );
        }

        self.client.addSoapHeader(
          self.soapHeader, self.name, self.namespace, self.xmlns
        );

        self.client.setSecurity(
          new soap.BearerSecurity(self.credentials.access_token)
        );

        self.client.query({query: query}, cb);
      }
    ],
    function(err, response) {
      return done(err, self.parseQueryResponse(response));
    });
  };

  self.setValidateOnly = function(flag) {
    self.validateOnly = flag;
    return self;
  };

  self.soapHeader = {
    RequestHeader: {
      developerToken: self.options.ADWORDS_DEVELOPER_TOKEN,
      userAgent: self.options.ADWORDS_USER_AGENT,
      clientCustomerId: self.options.ADWORDS_CLIENT_CUSTOMER_ID,
      validateOnly: self.validateOnly
    }
  };
}

AdWordsService.prototype = _.create(AdWordsObject.prototype, {
  'constructor': AdWordsService
});

module.exports = (AdWordsService);
