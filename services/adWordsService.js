// require external modules
var
  _ = require('lodash'),
  async = require('async'),
  pd = require('pretty-data').pd,
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
    validateOnly: false,
    verbose: false
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
    throw (new Error('googleads-node-lib not configured correctly'));
  }

  self.options = options;

  self.client = null;
  self.credentials = null;
  self.name = '';
  self.namespace = 'ns1';
  self.operatorKey = 'operator';
  self.pageKey = 'entries';
  self.selectorKey = 'selector';
  self.tokenUrl = 'https://www.googleapis.com/oauth2/v3/token';
  self.validateOnly = self.options.validateOnly;
  self.valueKey = 'value';
  self.verbose = self.options.verbose;
  self.version = 'v201509';

  self.formGetRequest = function(selector) {
    var request = {};
    request[self.selectorKey] = selector.toJSON();
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
              console.log('SOAP ERROR:\n', pd.xml(error), '\n');
            });

            self.description = self.client.describe();
            self.name = _.keys(self.description)[0];
            self.port = _.keys(self.description[self.name])[0];
            self.methods = _.keys(self.description[self.name][self.port]);

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
      return done(err, self.parsePage(response));
    });
  };

  self.mutate = function(options, done) {
    _.defaults(options, {
      parseMethod: self.parseMutateRval
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

  self.parseMutateRval = function(response) {
    if (self.validateOnly) {
      return {
        partialFailureErrors: null,
        collection: new self.Collection([])
      };
    } else {
      if (response.rval) {
        return {
          partialFailureErrors: response.rval.partialFailureErrors,
          collection: new self.Collection(response.rval[self.valueKey])
        };
      } else {
        return {};
      }
    }
  };

  self.parsePage = function(response) {
    if (self.validateOnly) {
      return {
        totalNumEntries: null,
        collection: null
      };
    } else {
      if (response.rval) {
        return {
          totalNumEntries: response.rval.totalNumEntries,
          collection: new self.Collection(response.rval[self.pageKey])
        };
      } else {
        return {};
      }
    }
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
      return done(err, self.parsePage(response));
    });
  };

  self.refresh = function(done) {
    // check if current credentials haven't expired
    if (self.credentials && Date.now() < self.credentials.expires) {
      // behave like an async
      setTimeout(function() {done(null);}, 0);
      return;
    } else {
      // throw away cached client
      self.client = null;

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
          self.credentials = JSON.parse(body);
          self.credentials.issued = Date.now();

          self.credentials.expires = self.credentials.issued -
            self.credentials.expires_in;

          done(error);
        }
      );

      return;
    }
  };

  self.setValidateOnly = function(flag) {
    self.validateOnly = flag;
    return self;
  };

  self.setVerbose = function(flag) {
    self.verbose = flag;
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

module.exports = (AdWordsService);
