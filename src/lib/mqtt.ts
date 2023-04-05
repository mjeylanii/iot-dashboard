import { MQTT_CONFIG, MQTT_TOPICS } from '$lib/config/mqtt.conf';
import { Client, Message } from 'paho-mqtt';
 class MQTTClient {
  private client: Client = new Client(
    MQTT_CONFIG.BROKER_IP,
    MQTT_CONFIG.BROKER_PORT,
    MQTT_CONFIG.CLIENT_ID
  );
   constructor(handleMessage: (message: Message) => void) {
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.onMessageArrived = handleMessage;
  }
   connect(options: object = {}) {
    try {
      console.log('Connecting to MQTT broker');
      this.client.connect(options);
    } catch (err) {
      console.error(err);
    }
  }
   onConnectionLost(response) {
    try {
      if (response.errorCode !== 0) {
        console.error(`Disconnected from MQTT broker: ${response.errorMessage}`);
        setTimeout(() => {
         this.connect();
        }, 5000);
      }
    } catch (err) {
      console.error(err);
    }
  }
   onMessageArrived(message: Message) {
    console.log(`Received message on topic ${message.destinationName}: ${message.payloadString}`);
    // handle the message here
  }
   publish(payload: string) {
    const message = new Message(payload);
    message.destinationName = MQTT_CONFIG.topic;
    this.client.send(message);
  }
   subscribe(topic: Array<any>): void {

    if (topic.length === 0) {
      console.error('No topics to subscribe to');
    }
    if(typeof topic == 'object'){
      console.log('object')

    }else{
      this.client.subscribe(topic);
    }
      
    
    return;
  }
}
 export default MQTTClient;