/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */
// Facebook App
  var projectKey = 'hxhcvFSh928vg7hi8QR0Jnj77PDeqEJfYTM9BNfkFW2iOMYiUuSrtCBcdVpg8DRQnqSlo3PnTvfiXuhx';
//  var projectKey = 'N6uTbKr2xOUv6xmlUNsSiZQKxVVnhGkIsOQ5ixifHNZFye3WXtwMFxkJogJLKWTy4LFFp5V4sFZZxpsI';
// Instantiate Base EVRYTHNG Object

//EVT.setup({
//  apiUrl: 'https://api-staging.evrythng.net'
//});

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