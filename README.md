# An unofficial node library for Google AdWords
[![Join the chat at https://gitter.im/ErikEvenson/googleads-node-lib](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ErikEvenson/googleads-node-lib?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) **Under development!**  Use with caution.

## Installing the library

```bash
npm install googleads-node-lib
```

## Getting your Google AdWords access and refresh tokens
Start by following the instructions at [https://developers.google.com/adwords/api/docs/guides/start](https://developers.google.com/adwords/api/docs/guides/start).  You will need client ID, a client secret, and an authorization code.  You will get the client ID and the client secret from the Google Developers Console.  To get an authorization code (filling in client_id and selecting account), open this URL in your browser:

```
https://accounts.google.com/o/oauth2/auth?client_id=<CLIENT_ID>&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords&redirect_uri=urn:ietf:wg:oauth:2.0:oob&access_type=offline&approval_prompt=auto
```

Use this code to get tokens (filling in your Google AdWords credentials):

```bash
curl \
  -d code=<AUTHORIZATION_CODE> \
  -d client_id=<CLIENT_ID> \
  -d client_secret=<CLIENT_SECRET> \
  -d redirect_uri=urn:ietf:wg:oauth:2.0:oob \
  -d grant_type=authorization_code https://accounts.google.com/o/oauth2/token
```

This yields something like:

```JSON
{
  "access_token" : <ACCESS_TOKEN>,
  "token_type" : "Bearer",
  "expires_in" : 3599,
  "refresh_token" : <REFRESH_TOKEN>
}
```

Use the `access_token` to make requests.  The `access_token` will expire.  Use the `refresh_token` to get a new access token.  The `refresh_token` will not expire. The `refresh_token` is a stored credential.

## Authentication
This library's services get Google AdWords credentials from the following sources in priority order:
- From passed in options values:

```javascript
var AdWords = require('googleads-node-lib');

var Service = new AdWords.ManagedCustomerService({
  ADWORDS_CLIENT_ID: 'your client id',
  ADWORDS_CLIENT_CUSTOMER_ID: 'your client customer id',
  ADWORDS_DEVELOPER_TOKEN: 'your developer token'
  ADWORDS_REFRESH_TOKEN: 'your refresh token',
  ADWORDS_SECRET: 'your secret',
  ADWORDS_USER_AGENT: 'your user agent',
});
```

- Via environment variables which are either present or loaded via a `.env` file.  An example `.env` file is provided in `.env-example`.

Failure to provide credentials will cause the library to throw a configuration error.

## Using the library
Here are some examples.  Documentation should improve, but in the mean time, the best places to look are the [integration tests](./tests/integration) and the [gulp tasks](./gulp).

### AdGroupService
Setting up the AdGroupService:

```javascript
var AdWords = require('googleads-node-lib');
var service = new AdWords.AdGroupService();
var clientCustomerId = 'the client customer ID you are interested in';
```

Getting AdGroups:

```javascript
var selector = new AdWords.Selector.model({
  fields: service.selectable,
  ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
  paging: {startIndex: 0, numberResults: 100}
});

service.get(clientCustomerId, selector, function(err, results) {
  if (err) console.log(err);
  else console.log(JSON.stringify(results, null, 2));
});
```

### AccountLabelService
Setting up the AccountLabelService:

```javascript
var AdWords = require('googleads-node-lib');
var service = new AdWords.AccountLabelService();
var clientCustomerId = 'the client customer ID you are interested in';
```

Getting account labels:

```javascript
var selector = new AdWords.Selector.model({
  fields: service.selectable,
  ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
  paging: {startIndex: 0, numberResults: 100}
});

service.get(clientCustomerId, selector, function(err, results) {
  if (err) console.log(err);
  else console.log(JSON.stringify(results, null, 2));
});
```

Adding an account label:

```javascript
var operand = new service.Model({
  name: 'the name of the account label'
});

service.mutateAdd(
  clientCustomerId,
  operand,
  function(err, results) {
    if (err) console.log(err);
    else console.log(JSON.stringify(results, null, 2));
  }
);
```

Removing an account label:

```javascript
var operand = new service.Model({
  id: 'the id of the account label'
});

service.mutateRemove(
  clientCustomerId,
  operand,
  function(err, results) {
    if (err) console.log(err);
    else console.log(JSON.stringify(results, null, 2));
  }
);
```

Changing the name of an account label:

```javascript
var operand = new service.Model({
  id: 'the id of the account label',
  name: 'the new name of the account label'
});

service.mutateSet(
  clientCustomerId,
  operand,
  function(err, results) {
    if (err) console.log(err);
    else console.log(JSON.stringify(results, null, 2));
  }
);
```

### CampaignService
Setting up the CampaignService:

```javascript
var AdWords = require('googleads-node-lib');
var service = new AdWords.CampaignService();
var clientCustomerId = 'the client customer ID you are interested in';
```

Getting your campaigns:

```javascript
var selector = new AdWords.Selector.model({
  dateRange: {min: '19700101', max: '20380101'},
  fields: service.selectable,
  ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
  paging: {startIndex: 0, numberResults: 100},
  predicates: []
});

service.get(clientCustomerId, selector, function(err, results) {
  if (err) console.log(err);
  else console.log(JSON.stringify(results, null, 2));
});
```

### ManagedCustomerService
Setting up the ManagedCustomerService:

```javascript
var AdWords = require('googleads-node-lib');
var service = new AdWords.ManagedCustomerService();
var clientCustomerId = 'the client customer ID you are interested in';
```

Getting your managed customers:

```javascript
var selector = new AdWords.Selector.model({
  dateRange: {min: '19700101', max: '20380101'},
  fields: service.selectable,
  ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
  paging: {startIndex: 0, numberResults: 100},
  predicates: []
});

service.get(clientCustomerId, selector, function(err, results) {
  if (err) console.log(err);
  else console.log(JSON.stringify(results, null, 2));
});
```

Adding a managed customer:

```javascript
var operand = new service.Model({
  name: 'the name of the customer',
  currencyCode: 'USD',
  dateTimeZone: 'America/Chicago'
});

service.mutateAdd(
  clientCustomerId,
  operand,
  function(err, results) {
    if (err) console.log(err);
    else console.log(JSON.stringify(results, null, 2));
  }
);
```

Hiding a managed customer:

```javascript
var operand = new service.ManagedCustomerLink({
  clientCustomerId: clientCustomerId,
  isHidden: true,
  managerCustomerId: managerCustomerId
});

service.mutateLinkSet(
  clientCustomerId,
  operand,
  function(err, results) {
    if (err) console.log(err);
    else console.log(JSON.stringify(results, null, 2));
    cb(err);
  }
);
```

## Changelog
### 0.0.33
- adds test options.

### 0.0.32
- stubs out first unit test.

### 0.0.31
- adds some integration tests for budgets.

### 0.0.30
- adds first integration tests.  These tests require a Google AdWords test account.

### 0.0.29
- adds `CampaignPerformanceReport`

### 0.0.28
- refactors
- adds reports: `AccountPerformanceReport` and `AdGroupPerformanceReport`

### 0.0.27
- adds reports

### 0.0.26
- adds `ReportDefinitionService`

### 0.0.25
- adds convenience functions to `AccountLabelService`
- adds `upgradeUrl` to `AdGroupAdService`

### 0.0.24
- fixes missing dependency

### 0.0.23
- bugfix

### 0.0.22
- fixes some return values

### 0.0.21
- updates soap module
- adds soap event handling via `verbose`
- adds `Paging` and `DateRange` types
- set consistent API version

### 0.0.20
- adds `TrafficEstimatorService`

### 0.0.19
- adds `TargetingIdeaService`

### 0.0.18
- adds support for AWQL queries (see campaign service gulp example)

### 0.0.17
- adds `ProductBiddingCategoryData` to `ConstantDataService`

### 0.0.16
- adds `ConstantDataService`

### 0.0.15
- adds `mutateAdd` to `BudgetService`

### 0.0.14
- lints and bugfixes

### 0.0.13
- adds `findByCustomerId` to `ManagedCustomerService`
- adds validation logic to `ManagedCustomer`

### 0.0.12
- adds `AdGroupCriterionService`
- adds `AdGroupAdService`
- adds `AdGroupService`
- adds `BiddingStrategyService`
- adds `BudgetService`
- adds `CampaignService`
- adds `CampaignCriterionService`

### 0.0.11
- adds `mutateRemove` for services
- adds `mutateSet` for services

### 0.0.10
- adds `AccountLabelService`

### 0.0.9
- bugfix

### 0.0.8
- add `mutateLink` for `ManagedCustomerService`

### 0.0.7
- caches service clients and credentials
- adds `mutateAdd` for `ManagedCustomerService`
