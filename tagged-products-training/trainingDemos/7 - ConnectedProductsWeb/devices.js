/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'DwYNgYqJQiUHfQQQHLclvWr4JtyOxX0Pd485Cp1zuYzNwO5raIPFeApyi4iz7joNgIBF5MiQ5IN2SMKn';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);
  var thngId = 'UVQRAhSs8epa2htestpa5e2q';

  var restUrl = 'http://api.evrythng.com';

  var user;

  function displayResults(message, data) {
    $(document).ready(function () {
      $('#results').append('<h2>' + message + '</h2><pre>' + JSON.stringify(data, null, 2) + '</pre>');
    });
  }

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
      displayResults('User', appUser);

    });
  }

  function login(userid,pwd) {

    // Login user (with Evrythng Auth) and create user scope
    app.login({
      email: userid,
      password: pwd
    }).then(function(response){
      user = response.user;
      displayResults('User Logged In', user);
    });

  }

  function listDevices() {
    'use strict';
    console.log('get devices for user', user);

    user.thng(thngId).read().then(function (device) {
      displayResults('Devices', device);
    });
  }


  function listDevicesRest() {
    'use strict';
    console.log('get devices for user Rest API', user);

    var xhr = new XMLHttpRequest();

    $(document).ready(function() {
      $.ajax({
        url: restUrl + '/products',
        type: 'GET',
        datatype: 'json',
        success: function(resp) {
          displayResults('Rest Call List Products', resp);
        },
        error: function() { alert('Failed!'); },
        beforeSend: setHeader
      });
    });

    function setHeader(xhr) {
      xhr.setRequestHeader('Authorization', projectKey);
    }


  }

  function clearResults() {

    $('#results').html('');

  }

  function addUserToScope() {

    console.log('Adding User to Scope');

    user.thng(thngId).read({params: {withScopes:true}}).then(function (device) {
      console.log('scopes', device.scopes.users);
      displayResults('Device with Scope', device);
      newThngDocument = device;

      // add this user to the scope

      newThngDocument.scopes.users[0] = user.id;
      console.log('devices', device);
      device.update(newThngDocument, {params: {withScopes:true}}).then(function(newThng){

        console.log('thng updated', newThng);
        displayResults('Device Scope Updated', newThng);
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
      displayResults('Device Added', device);

    })

  }

  function updatePropertyOnDevice() {

    var thngId = 'UVQRAhSs8epa2htestpa5e2q';

    user.thng(thngId).read().then(function(thng) {

      // Properties

      // update single property
      thng.property('numberofoutlets').update(2);

      // update multiple properties
      thng.property('numberofoutlets').read().then(function (propertyHistory) {

        console.log(propertyHistory);
        displayResults('Property Updated', propertyHistory);

      });

    });

  }

  function subscribeProperty() {

    console.log('property Subscribe');

    displayResults('Subscribe to Property Change', '{}');

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

      displayResults('New MQTT Message', message);
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
    displayResults('Added Action', actionType);
  });

  console.log('Action Created');

}