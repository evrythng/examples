var mqtt = require('mqtt');

var thngId='UWFd8YMe8VKwfYDxUhbUkrNh'
var thngUrl='/thngs/'+thngId

// This is using the unsecure version - for simplicity's sake - obviously, don't use it in production
var client = mqtt.connect("mqtt://mqtt.evrythng.com:1883", {
  username: 'authorization',
  password: 'kjNzrcvYNFbCgL9KVuWf0vX9VneBWOuriQlUOI7mGXd50Ww6IOeh45vQwXxiCbg5nFvTGzxpHZph7AUO' //Your device API KEY
});

client.on('connect', function () { // Called once when connected
  client.subscribe(thngUrl+'/properties/');
  client.subscribe(thngUrl+'/actions/');
  setTimeout(updateProperty, 2000); // We set a callback in 2 seconds
});

// This will be called every time a property is updated or an event changes
client.on('message', function (topic, message) {
  console.log(message.toString());
});

// update a property
function updateProperty () {
  // Let's set the light in a random time span
  var level = Math.round(Math.random()*1000);
  client.publish(thngUrl+'/properties/lightlevel', '[{"value": '+level+'}]');
  setTimeout(updateProperty, 5000); // We set a callback in 2 seconds
}



// Let's close this connection cleanly
process.on('SIGINT', function() {
  client.publish(thngUrl+'/properties/connectedat', '[{"value": false}]');
  client.end();
  process.exit();
});