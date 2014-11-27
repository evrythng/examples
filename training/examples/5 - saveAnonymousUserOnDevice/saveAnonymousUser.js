/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);
// save last scanned Product ID

function createAnonymousUserAndSave() {
  // Retrieve the stored User from Local Device Storage
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
    });
  }
  else {
    var anonymousUser = new EVT.User({
      id: localStorage.deviceUser,
      apiKey: localStorage.deviceApiKey
    }, app);
    console.log('Anonymous User read from Local Storage : ' + JSON.stringify(anonymousUser));
    $('#results').append('<h2>User</h2>' + JSON.stringify(anonymousUser, null, 2));
  }
}