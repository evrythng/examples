/**
 * Created by dibster on 28/10/14.
 *
 * uses request library https://github.com/request/request
 */
var operatorKey = 'EVRYTHNGOPERATORKEY';
var body = {};

var actionId = "UVDQDFGRPBpwQ2attwwTEsKm";

var request = require('request');

var options = {
  method: 'GET',
  url: 'https://api.evrythng.com/actions/scans/' + actionId,
  headers: {
    'Authorization': operatorKey
  }
};

function callback(error, response, body) {

  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log('Product Id ' + info.product);
  }
  else {
    console.log('error' + error);
  }
}

request(options, callback);