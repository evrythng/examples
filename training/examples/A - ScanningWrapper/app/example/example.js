/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
// Instantiate Base EVRYTHNG Object
var app = new EVT.App(projectKey);

var helper = new EVTHelper();

// get user and Scan Object (async, do before Scan when page first loads)
var user, st;
helper.getUserContext(EVT, app).then(function (userResponse) {
  user = userResponse;
});

helper.setupScanthng(EVT,app).then(function (stReponse) {
  st = stReponse;
});

function scan() {
  helper.scan(st, user).then(function (response) {
    console.log(response);
    $('#results').append('<h2>Response</h2>' + JSON.stringify(response, null, 2));
    if (response.rc === 0) {
      $('#results').append('<h2>ActionId</h2>' + helper.getParameterByName(response.url, 'Action Id'));
    }
  })
}

function decodeParmString(fullUrl) {
  var style = helper.getParameterByName(fullUrl, 'type');
  if (style === 'classic') {
    // set classic style
  }
}

function scanAndRedirect() {
  helper.scan(st,user).then(function (response) {
    if (response.rc === 0 ) {
      window.location.replace(response.url)
    }
    else {
      // ask for rescan of bottle / redirect to last campaign
    }
  })
}