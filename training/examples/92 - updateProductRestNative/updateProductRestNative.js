/**
 * Created by dibster on 28/10/14.
 *
 * uses request library https://github.com/request/request
 */
var operatorKey = 'I1gL9iHt3IEsn2icY6NFXreEFl3lP62HTM40neKxJrRV3Dkis3dTTmNulzZoLlBxJA1Zj0ybU1g7BVeI';
var body = {};
body.description = "Updated Description in REST Call";

body.customFields = {};
body.customFields.height = 100;
body.customFields.width = 100;
body.customFields.depth = 100;

var request = require('request');

var options = {
  method: 'PUT',
  url: 'https://api.evrythng.com/products/UVddn5kx8BpRBWmKqqMCBhAs',
  headers: {
    'Authorization': operatorKey
  },
  json: body
};

function callback(error, response, body) {

  if (!error && response.statusCode == 200) {
//    var info = JSON.parse(body);
      console.log(body);
  }
  else {
    console.log('error' + error);
  }
}





console.info(JSON.stringify(body));

request(options, callback);