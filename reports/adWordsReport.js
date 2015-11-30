// require external modules
var
  _ = require('lodash'),
  async = require('async'),
  request = require('request');

var AdWordsObject = require('../adWordsObject');

// define abstract AdWords report
function AdWordsReport(options) {
  var self = this;
  AdWordsObject.call(self, options);

  self.reportUrl = 'https://adwords.google.com/api/adwords/reportdownload/' +
    self.version;

  self.getReport = function(options, done) {
    async.series([
      // get credentials
      self.refresh,
      // get report
      function(cb) {
        var rdxml = self.getRdxml();

        var opts = {
          body: '__rdxml=' + encodeURIComponent(rdxml),
          headers: {
            Authorization: 'Bearer ' + self.credentials.access_token,
            developerToken: self.options.ADWORDS_DEVELOPER_TOKEN,
            clientCustomerId: options.clientCustomerId,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          url: self.reportUrl,
        };

        request(opts, done);
      }
    ],
    done);
  };
}

AdWordsReport.prototype = _.create(AdWordsObject.prototype, {
  'constructor': AdWordsReport
});

module.exports = (AdWordsReport);
