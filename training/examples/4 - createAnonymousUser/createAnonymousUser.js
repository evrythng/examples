/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);
// save last scanned Product ID

function createAnonymousUser() {
  // Create Anonymous User
  app.appUser().create({
    anonymous: true
  }).then(function(anonymousUser) {
    console.log('Created anonymous user: ', anonymousUser); // good to go, doesn't need validation
    $('#results').append('<h2>User</h2>' + JSON.stringify(anonymousUser, null, 2));
  });
}