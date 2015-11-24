module.exports = {
  // Campaign data management
  AdGroupAdService: require('./services/adGroupAdService'),
  AdGroupCriterionService: require('./services/adGroupCriterionService'),
  AdGroupFeedService: null,
  AdGroupService: require('./services/adGroupService'),
  AdwordsUserListService: null,
  BudgetService: require('./services/budgetService'),
  CampaignCriterionService: require('./services/campaignCriterionService'),
  CampaignExtensionSettingService: null,
  CampaignFeedService: null,
  CampaignService: require('./services/campaignService'),
  ConversionTrackerService: null,
  DataService: null,
  FeedItemService: null,
  FeedMappingService: null,
  FeedService: null,
  OfflineConversionFeedService: null,

  // Optimization
  ExperimentService: null,
  ReportDefinitionService: null,
  TargetingIdeaService: require('./services/targetingIdeaService'),
  TrafficEstimatorService: require('./services/trafficEstimatorService'),

  // Account management
  CustomerService: null,
  CustomerSyncService: null,
  ManagedCustomerService: require('./services/managedCustomerService'),

  // Utility
  BatchJobService: null,
  GeoLocationService: null,
  MediaService: null,
  ConstantDataService: require('./services/constantDataService'),
  LocationCriterionService: null,

  // Other (not categorized by AdWords)
  AccountLabelService: require('./services/accountLabelService'),
  AdCustomizerFeedService: null,
  AdGroupBidModifierService: null,
  AdGroupExtensionSettingService: null,
  AdParamService: null,
  CustomerFeedService: null,
  LabelService: null,
  MutateJobService: null,
  SharedCriterionService: null,
  SharedSetService: null,
  BiddingStrategyService: require('./services/biddingStrategyService'),
  Selector: require('./types/selector'),
  printMsg: function() {console.log('UNDER DEVELOPMENT!  Use with caution.');}
};
