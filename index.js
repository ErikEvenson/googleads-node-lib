module.exports = {
  AccountLabelService: require('./services/accountLabelService'),
  AdGroupAdService: require('./services/adGroupAdService'),
  AdGroupCriterionService: require('./services/adGroupCriterionService'),
  AdGroupService: require('./services/adGroupService'),
  BiddingStrategyService: require('./services/biddingStrategyService'),
  BudgetService: require('./services/budgetService'),
  CampaignService: require('./services/campaignService'),
  CampaignCriterionService: require('./services/campaignCriterionService'),
  ConstantDataService: require('./services/constantDataService'),
  ManagedCustomerService: require('./services/managedCustomerService'),
  Selector: require('./types/selector'),
  printMsg: function() {console.log('UNDER DEVELOPMENT!  Use with caution.');}
};
