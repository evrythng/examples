/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */
  var projectKey = 'EVRYTHNGPROJECTKEY';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);

function createUser() {
// create app user
  app.appUser().create({
    email: 'someone2@anyone.com',
    password: 'password', // don't put this one in the code :)
    firstName: 'Some',
    lastName: 'One'
   }).then(function (appUser) {
     console.log('Created user: ', appUser);
     // validate app user
     return appUser.validate();
    }).then(function (appUser) {
      // validated user and his api key
      console.log('Validated app user: ', appUser);
      $('#results').append('<h2>User</h2>' + JSON.stringify(appUser, null, 2));
  });
}


