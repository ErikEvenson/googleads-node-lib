var
  _ = require('lodash');

var AdWordsReport = require('./adWordsReport');

function Report(options) {
  var self = this;
  self.defaultFieldNames = [
    'AccountCurrencyCode',
    'AccountDescriptiveName',
    'AccountTimeZoneId',
    // 'ActiveViewCpm',
    // 'ActiveViewCtr',
    // 'ActiveViewImpressions',
    // 'ActiveViewMeasurability',
    // 'ActiveViewMeasurableCost',
    // 'ActiveViewMeasurableImpressions',
    // 'ActiveViewViewability',
    'AdNetworkType1',
    'AdNetworkType2',
    // 'AllConversionRate',
    // 'AllConversions',
    // 'AllConversionValue',
    // 'AverageCost',
    // 'AverageCpc',
    // 'AverageCpe',
    // 'AverageCpm',
    // 'AverageCpv',
    // 'AveragePosition',
    'CanManageClients',
    'ClickConversionRate',
    'Clicks',
    // 'ClickType',
    // 'ContentBudgetLostImpressionShare',
    // 'ContentImpressionShare',
    // 'ContentRankLostImpressionShare',
    // 'ConversionCategoryName',
    'ConversionRate',
    'Conversions',
    // 'ConversionTrackerId',
    // 'ConversionTypeName',
    'ConversionValue',
    'ConvertedClicks',
    'Cost',
    // 'CostPerAllConversion',
    'CostPerConversion',
    'CostPerConvertedClick',
    // 'CrossDeviceConversions',
    'Ctr',
    'CustomerDescriptiveName',
    'Date',
    'DayOfWeek',
    'Device',
    'EngagementRate',
    'Engagements',
    'ExternalCustomerId',
    // 'HourOfDay',
    'Impressions',
    'InteractionRate',
    'Interactions',
    // 'InvalidClickRate',
    // 'InvalidClicks',
    'IsAutoTaggingEnabled',
    'IsTestAccount',
    'Month',
    'MonthOfYear',
    'PrimaryCompanyName',
    'Quarter',
    // 'SearchBudgetLostImpressionShare',
    // 'SearchExactMatchImpressionShare',
    // 'SearchImpressionShare',
    // 'SearchRankLostImpressionShare',
    // 'Slot',
    'ValuePerAllConversion',
    'ValuePerConversion',
    'ValuePerConvertedClick',
    'VideoViewRate',
    'VideoViews',
    'ViewThroughConversions',
    'Week',
    'Year'
  ];

  self.reportName = 'Account Performance Report';
  self.reportType = 'ACCOUNT_PERFORMANCE_REPORT';
  AdWordsReport.call(self, options);
}

Report.prototype = _.create(AdWordsReport.prototype, {
  'constructor': Report
});

module.exports = (Report);
