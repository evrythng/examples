/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'DwYNgYqJQiUHfQQQHLclvWr4JtyOxX0Pd485Cp1zuYzNwO5raIPFeApyi4iz7joNgIBF5MiQ5IN2SMKn';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);
  var thngId = 'UVQRAhSs8epa2htestpa5e2q';

  var user;

  function newUser(userid, pwd) {
    'use strict';
    console.log('add a user', userid, pwd);
    // create app user
    app.appUser().create({
      email: userid,
      password: pwd ,
      firstName: 'Some',
      lastName: 'One'
    }).then(function(appUser){
      console.log('Created user: ', appUser);

      // validate app user
      return appUser.validate();

    }).then(function(appUser){

      // validated user and his api key
      $(document).ready(function () {
        $('#results').append('<h2>User</h2>' + JSON.stringify(appUser, null, 2));
      });

    });
  }

function login(userid,pwd) {

  // Login user (with Evrythng Auth) and create user scope
  app.login({
    email: userid,
    password: pwd
  }).then(function(response){
    user = response.user;
    $(document).ready(function () {
      $('#results').append('<h2>Logged In User</h2>' + JSON.stringify(user, null, 2));
    });
  });

}

  function listDevicesRest() {
    'use strict';
    console.log('get devices for user', user);

    user.thng(thngId).read().then(function (device) {
      $(document).ready(function () {
        $('#results').append('<h2>Devices</h2>' + JSON.stringify(device, null, 2));
      });
    });
  }

  function clearResults() {

    $('#results').html('');

  }

  function addUserToScope() {

    console.log('Adding User to Scope');

    user.thng(thngId).read({params: {withScopes:true}}).then(function (device) {
      console.log('scopes', device.scopes.users);
      $(document).ready(function () {
        $('#results').append('<h2>Device With Scope</h2>' + JSON.stringify(device, null, 2));
      });
      // add this user to the scope

      newThngDocument = device;

      newThngDocument.scopes.users[0] = user.id;
      console.log('devices', device);
      device.update(newThngDocument, {params: {withScopes:true}}).then(function(newThng){

        console.log('thng updated', newThng);
        $(document).ready(function () {
          $('#results').append('<h2>Device Scope Updated</h2>' + JSON.stringify(newThng, null, 2));
        });
      });

    });

  }

  function createNewDevice() {

    var newDevice = {};
    newDevice.name = 'New Device';
    newDevice.customFields = {};
    newDevice.customFields.zone = 'inside';
    newDevice.customFields.zone = 'kitchen';

    newDevice.properties = {};
    newDevice.properties.numberofoutlets = 4;

    newDevice.identifiers = {};
    newDevice.identifiers.serialnumber = 'ABCDEFGHIJKL';

    user.thng().create(newDevice).then(function (device) {
      console.log('added New Device', device);
      $(document).ready(function () {
        $('#results').append('<h2>Device Added</h2>' + JSON.stringify(device, null, 2));
      });

    })

  }

  function updatePropertyOnDevice() {

    var thngId = 'UVQRAhSs8epa2htestpa5e2q';

    user.thng(thngId).read().then(function(thng) {

      // Properties

      // update single property
      thng.property('numberofoutlets').update(2);

      // update multiple properties
      thng.property('numberofoutlets').read().then(function (statusHistory) {

        console.log(statusHistory);

      });

    });

  }

  function subscribeProperty() {

    console.log('property Subscribe');

    var thngId = 'UVQRAhSs8epa2htestpa5e2q';

    var clientId = "test_" + new Date().getTime();
    client = new Paho.MQTT.Client("pubsub.evrythng.com", 80, clientId);
    console.log("Client instantiated.");
    client.startTrace();
    console.log("Now trying to connect...");
    client.onMessageArrived = onMessageArrived;
    client.connect({onSuccess:onConnect});

    function onConnect() {
      console.log("connection established");
      doSubscribe();
    }

    function doSubscribe() {
      client.subscribe('thngs/' + thngId + '/properties?access_token=' + user.apiKey);
    }

    function onMessageArrived(message) {
      console.log("onMessageArrived:"+ message.payloadString);
      updateForm(message.payloadString);
    }

    function updateForm(message) {

      $(document).ready(function () {
        $('#results').append('<h2>New Message</h2>' + JSON.stringify(message, null, 2));
      });
    }

  }

function addActionToDevice() {

  var actionType = '_ControlPowerState';

  var thngId = 'UVQRAhSs8epa2htestpa5e2q';

  user.thng(thngId).read().then(function(thng){

    thng.action(actionType).create({
      customFields : {
        outlet_number : 1,
        state : "On"
      }
    });

  });

  console.log('Action Created');

}