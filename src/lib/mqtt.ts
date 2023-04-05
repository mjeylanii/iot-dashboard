import * as Paho from 'paho-mqtt';
import { MQTT_CONFIG } from '$lib/config/config';
import { mqtt, temperature } from '$lib/store.js';
import { subscribe } from 'svelte/internal';

class MqttClient {
  public client: any;
  public isConnected: boolean = false;
  constructor() {
    this.client = new Paho.Client(MQTT_CONFIG.BROKER_IP, MQTT_CONFIG.BROKER_PORT, 'client-id');
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnect = this.onConnect.bind(this);
 
  }

  async connect(topics) {

      try
     { this.client.connect({
        onSuccess: this.onConnect.bind(this, topics),
        onFailure: this.onFailure.bind(this),
      }); } 
      catch (e) {
        console.log(e);
      }
    }
  

  onConnect(topics) {
    console.log('MQTT client connected');
    subscribe(topics)
    this.isConnected = true;
  }

  onFailure() {
    console.log('MQTT client connection failed');
    this.isConnected = false;
  }

  onConnectionLost(responseObject: OnConnectionLost): void {
    if (responseObject.errorCode !== 0) {
      console.log(`MQTT client connection lost: ${responseObject.errorMessage}`);
      this.isConnected = false;
    }
  }

  onMessageArrived(message: this.client.OnMessageArrived) {
    console.log(`MQTT message received on topic ${message.destinationName}: ${message.payloadString}`);
    //temperature.update(message.payloadString);
  }

  subscribe(topic: string) {
  
    console.log(`Subscribing to MQTT topic ${topic}`);
    this.client.subscribe(topic);

  }

  unsubscribe(topic) {
    console.log(`Unsubscribing from MQTT topic ${topic}`);
    this.client.unsubscribe(topic);
  }

  publish(topic, payload) {
    console.log(`Publishing MQTT message to topic ${topic}: ${payload}`);
    const message = new Paho.Message(payload);
    message.destinationName = topic;
    this.client.send(message);
  }
}

export default new MqttClient();
