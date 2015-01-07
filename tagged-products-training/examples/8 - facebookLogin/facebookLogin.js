/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */
// Facebook App
  var projectKey = 'FAQCEBOOKPROJECTKEY';
// Instantiate Base EVRYTHNG Object

  var app = new EVT.App(projectKey);
// save last scanned Product ID

app = new EVT.App({
  apiKey: projectKey,
  facebook: true
});

console.log(app);

function facebookLogin() {

  app.login('facebook').then(function(response){
    var user = response.user;
    console.log(app.socialNetworks.facebook.appId);
    $('#results').append('<h2>User</h2>' + JSON.stringify(user, null, 2));
  });
}

function facebookLogout() {
  // Create Anonymous User
    user.logout('facebook');
}