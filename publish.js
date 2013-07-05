var mqtt = require('mqtt');

var port  = 1883,
    host  = 'test.mosquitto.org',
    topic = process.env.MQTT_TOPIC,
    isConnected = false,
    client;

client = mqtt.createClient(port, host);

client.on('connect', function(err, client) {
  console.log('MQTT connected');
  isConnected = true;
});

function publishRfid(id) {
  if (isConnected) { client.publish(topic, id); }
}

exports.publishRfid = publishRfid;