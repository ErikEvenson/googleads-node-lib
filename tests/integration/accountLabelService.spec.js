var
  async = require('async'),
  expect = require('expect'),
  uuid = require('uuid');

describe('AccountLabelService', function() {
  var AdWords = require('../..');
  var service = new AdWords.AccountLabelService();

  it('should provide a service description', function(done) {
    service.getClient(function(err, client) {
      expect(err).toNotExist();
      expect(service.description).toExist();
      return done(err);
    });
  });

  it('should get account labels', function(done) {
    var selector = new AdWords.Selector.model({
      fields: service.selectable,
      ordering: [{field: 'Name', sortOrder: 'ASCENDING'}]
    });

    service.get(
      process.env.ADWORDS_CLIENT_CUSTOMER_ID,
      selector,
      function(err, results) {
        expect(err).toNotExist();
        expect(results.labels).toExist();
        return done(err);
      }
    );
  });

  it('should create, set, and remove an account label', function(done) {
    var label = null;

    async.series(
      [
        // add the account label
        function(cb) {
          service.addAccountLabel(
            process.env.ADWORDS_CLIENT_CUSTOMER_ID,
            'T-' + uuid.v4(),
            function(err, results) {
              expect(err).toNotExist();
              expect(results.labels).toExist();
              expect(results.labels.length).toEqual(1);
              label = results.labels.pop();
              return cb(err, label);
            }
          );
        },
        // set account label
        function(cb) {
          var labelName = 'T-' + uuid.v4();

          service.setAccountLabel(
            process.env.ADWORDS_CLIENT_CUSTOMER_ID,
            label.get('id'),
            labelName,
            function(err, results) {
              expect(err).toNotExist();
              expect(results.labels).toExist();
              expect(results.labels.length).toEqual(1);
              label = results.labels.pop();
              expect(label.get('name')).toEqual(labelName);
              return cb(err, label);
            }
          );
        },
        // remove account label
        function(cb) {
          service.removeAccountLabel(
            process.env.ADWORDS_CLIENT_CUSTOMER_ID,
            label.get('id'),
            function(err, results) {
              expect(err).toNotExist();
              expect(results.labels).toExist();
              expect(results.labels.length).toEqual(1);
              return cb(err);
            }
          );
        }
      ],
      function(err, results) {
        done(err);
      }
    );
  });
});
