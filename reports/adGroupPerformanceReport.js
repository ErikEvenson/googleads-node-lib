var
  _ = require('lodash'),
  async = require('async'),
  request = require('request'),
  soap = require('soap');

var AdWordsReport = require('./adWordsReport');
var reportUrl = 'https://adwords.google.com/api/adwords/reportdownload/v201509';

function Report(options) {
  var self = this;
  AdWordsReport.call(self, options);

  self.getReport = function(options, done) {
    async.series([
      // get credentials
      self.refresh,
      // get report
      function(cb) {
        var opts = {
          body: '__rdxml=' + encodeURIComponent(options.rdxml),
          headers: {
            Authorization: 'Bearer ' + self.credentials.access_token,
            developerToken: self.options.ADWORDS_DEVELOPER_TOKEN,
            clientCustomerId: options.clientCustomerId,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          url: reportUrl,
        };

        request(opts, done);
      }
    ],
    done);
  };
}

Report.prototype = _.create(AdWordsReport.prototype, {
  'constructor': Report
});

module.exports = (Report);
