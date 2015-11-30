var
  _ = require('lodash'),
  async = require('async'),
  gulp = require('gulp'),
  pd = require('pretty-data').pd,
  soap = require('soap');

gulp.task(
  'adWords:reportDefinitionService:describe',
  'describe Google AdWords service',
  function(cb) {
    var AdWords = require('..');
    var service = new AdWords.ReportDefinitionService();

    service.getClient(function(err, client) {
      if (err) return cb(err);
      console.log(JSON.stringify(service.description, null, 2));
      return cb(err);
    });
  }
);

gulp.task(
  'adWords:reportDefinitionService:getReportFields',
  'gets Google AdWords report fields',
  function(cb) {
    var argv = require('yargs')
      .boolean('fieldNames')
      .choices(
        'reportType',
        [
          'KEYWORDS_PERFORMANCE_REPORT',
          'AD_PERFORMANCE_REPORT',
          'URL_PERFORMANCE_REPORT',
          'ADGROUP_PERFORMANCE_REPORT',
          'CAMPAIGN_PERFORMANCE_REPORT',
          'ACCOUNT_PERFORMANCE_REPORT',
          'GEO_PERFORMANCE_REPORT',
          'SEARCH_QUERY_PERFORMANCE_REPORT',
          'AUTOMATIC_PLACEMENTS_PERFORMANCE_REPORT',
          'CAMPAIGN_NEGATIVE_KEYWORDS_PERFORMANCE_REPORT',
          'CAMPAIGN_NEGATIVE_PLACEMENTS_PERFORMANCE_REPORT',
          'DESTINATION_URL_REPORT',
          'SHARED_SET_REPORT',
          'CAMPAIGN_SHARED_SET_REPORT',
          'SHARED_SET_CRITERIA_REPORT',
          'CREATIVE_CONVERSION_REPORT',
          'CALL_METRICS_CALL_DETAILS_REPORT',
          'KEYWORDLESS_QUERY_REPORT',
          'KEYWORDLESS_CATEGORY_REPORT',
          'CRITERIA_PERFORMANCE_REPORT',
          'CLICK_PERFORMANCE_REPORT',
          'BUDGET_PERFORMANCE_REPORT',
          'BID_GOAL_PERFORMANCE_REPORT',
          'DISPLAY_KEYWORD_PERFORMANCE_REPORT',
          'PLACEHOLDER_FEED_ITEM_REPORT',
          'PLACEMENT_PERFORMANCE_REPORT',
          'CAMPAIGN_NEGATIVE_LOCATIONS_REPORT',
          'GENDER_PERFORMANCE_REPORT',
          'AGE_RANGE_PERFORMANCE_REPORT',
          'CAMPAIGN_LOCATION_TARGET_REPORT',
          'CAMPAIGN_AD_SCHEDULE_TARGET_REPORT',
          'CAMPAIGN_PLATFORM_TARGET_REPORT',
          'PAID_ORGANIC_QUERY_REPORT',
          'AUDIENCE_PERFORMANCE_REPORT',
          'DISPLAY_TOPICS_PERFORMANCE_REPORT',
          'USER_AD_DISTANCE_REPORT',
          'SHOPPING_PERFORMANCE_REPORT',
          'PRODUCT_PARTITION_REPORT',
          'PLACEHOLDER_REPORT',
          'AD_CUSTOMIZERS_FEED_ITEM_REPORT',
          'LABEL_REPORT',
          'FINAL_URL_REPORT',
          'VIDEO_PERFORMANCE_REPORT',
          'UNKNOWN'
        ]
      )
      .default(
        'clientCustomerId',
        process.env.ADWORDS_CLIENT_CUSTOMER_ID,
        'clientCustomerId of account'
      )
      .default('fieldNames', false, 'show field names only')
      .demand('reportType', 'report type')
      .argv;

    var AdWords = require('..');

    var service = new AdWords.ReportDefinitionService()
      .setValidateOnly(argv.validateOnly)
      .setVerbose(true);

    var options = {
      reportType: argv.reportType
    };

    service.getReportFields(options, function(err, results) {
      if (err) return cb(err);
      else {
        if (argv.fieldNames) {
          results = results.rval.map(function(result) {
            return result.get('fieldName');
          });

          console.log(results);
        } else {
          console.log(JSON.stringify(results, null, 2));
        }
      }

      return cb(err);
    });
  }
);
