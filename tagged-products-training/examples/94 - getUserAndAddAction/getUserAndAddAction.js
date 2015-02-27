/**
 * Created by dibster on 28/10/14.
 *
 * uses request library https://github.com/request/request
 */
var appKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
var body = {};

var request = require('request');

function callbackUserLogin(error, response, body) {
  // note 201 resturn code from API
  if (!error && response.statusCode == 201) {
    console.log('Login Test');
    console.log('===== ====');
    console.log('User ' + body.evrythngUser);
    console.log('apiKey ' + body.evrythngApiKey);
  }
  else {
    console.log('error' + error);
  }
}

function callbackAction(error, response, body) {
  // note 201 resturn code from API
  if (!error && response.statusCode == 201) {
    console.log('Action Added');
    console.log('====== =====');
    console.log(JSON.stringify(body));
  }
  else {
    console.log('error' + error);
  }
}

function getUserKey() {
  var userDetails = {
    "email": "cokeusertestrules@mcc.com",
    "password": "PASSWORD"
  };
  var options = {
    method: 'POST',
    url: 'https://api.evrythng.com/auth/evrythng/',
    headers: {
      'Authorization': appKey
    },
    json : userDetails
  };
  request(options, callbackUserLogin());
}

function addActionOnProduct() {
  var actionDetails = {
    "type": "_Purchase",
    "product": "UVAdnpxbPepRQEN9gKV6AfEa"
  };
  var userKey = 'EVRYTHNGUSERKEY';
  var ActionType = "_Purchase";

  var options = {
    method: 'POST',
    url: 'https://api.evrythng.com/actions/' + ActionType,
    headers: {
      'Authorization': userKey
    },
    json : actionDetails
  };
  request(options, callbackAction);
}

getUserKey();

addActionOnProduct();


