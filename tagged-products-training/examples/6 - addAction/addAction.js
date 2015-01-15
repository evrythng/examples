/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

var projectKey = 'NxDNY8T4NVkF4O2ATKLAt1lAtrNufKitoSohdqgV7jWjs4FUo3xSBGUkNsNSnC15lixixnWpjpxiz848';
// Instantiate Base EVRYTHNG Object
var app = new EVT.App(projectKey);

var productId = "Ue3RaHkVseKRwrwAqUy6yCtp";

$('#productId').text = productId;

var user = createAnonymousUserAndSave();

function createAnonymousUserAndSave() {
  // Retrieve the stored User from Local Device Storage

  // Could have a fallback to Cookies, or create a new user each time.

  var userId = window.localStorage.getItem('deviceUser');
  if (userId === null) {
    app.appUser().create({
      anonymous: true
    }).then(function (anonymousUser) {
      console.log('Created anonymous user: ', anonymousUser);
      $('#results').append('<h2>User</h2>' + JSON.stringify(anonymousUser, null, 2));
      if (window.localStorage) {
        localStorage.deviceUser = anonymousUser.id;
        localStorage.deviceApiKey = anonymousUser.apiKey;
      }
      return anonymousUser;
    });
  }
  else {
    var anonymousUser = new EVT.User({
      id: localStorage.deviceUser,
      apiKey: localStorage.deviceApiKey
    }, app);
    console.log('Anonymous User read from Local Storage : ' + JSON.stringify(anonymousUser));
    $('#results').append('<h2>User</h2>' + JSON.stringify(anonymousUser, null, 2));
    return anonymousUser;
  }
}

function addAction() {
  // add an action to the product
  console.log($('#productId').text);
  var productId = "Ue3RaHkVseKRwrwAqUy6yCtp";
  user.product(productId).read().then(function(product) {
    product.action('scans').create().then(function(response) {
      console.log(response);
      $('#results').append('<h2>Action Response</h2>' + JSON.stringify(response, null, 2));
    });
  });
}