var
  pd = require('pretty-data').pd;

module.exports = {
  handleSoapResponse: function(err, rval, lastRequest) {
    if (err) {
      console.log(err);
      console.log('REQUEST:');
      console.log(pd.xml(lastRequest));
      console.log('ERROR:');
      console.log(pd.xml(rval.body, null, 2));
    } else {
      console.log('REQUEST:');
      console.log(pd.xml(lastRequest));
      console.log('\nRESPONSE:');
      console.log(JSON.stringify(rval, null, 2));
    }
  }
};
