const mqtt = require('mqtt');

// Export these in your shell session (MQTT_URL has a default value)
const {
  DEVICE_API_KEY,
  THNG_ID,
  MQTT_URL = 'mqtts://mqtt.evrythng.com:8883',
} = process.env;

const main = () => {
  // Create client and authorize with broker
  const client = mqtt.connect(MQTT_URL, { username: 'authorization', password: DEVICE_API_KEY });

  // When connected, subscribe to Thng property updates
  client.on('connect', () => {
    console.log('Connected!');

    client.subscribe(`/thngs/${THNG_ID}/properties`);
  });

  // When a message is received, print it
  client.on('message', (topic, message) => console.log(`${topic}: ${message}`));
};

main();
