var expect = require('expect');

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
});
