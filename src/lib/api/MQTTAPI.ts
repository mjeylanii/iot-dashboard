import * as Paho from 'paho-mqtt';

export class MQTTAPI {
  private client: Paho.Client;
  private isConnected: boolean = false;

  constructor(
    private host: string,
    private port: number,
    private clientId: string,
    private username?: string,
    private password?: string,
    private reconnectTimeout?: number,
    private onConnectionSuccess?: () => void,
    private onConnectionFailure?: () => void,
  ) {
    this.client = new Paho.Client(host, port, clientId);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.onMessageArrived = this.onMessageArrived.bind(this);

    if (username && password) {
      this.client.username = username;
      this.client.password = password;
    }

    if (reconnectTimeout) {
      this.client.reconnect = true;
      this.client.reconnectInterval = reconnectTimeout;
    }
  }

connect() {
    if (this.isConnected) return;
    this.client.connect({
      onSuccess: () => {
        this.isConnected = true;
        console.log('Connected to MQTT broker');
        if (this.onConnectionSuccess) this.onConnectionSuccess();
      },
      onFailure: () => {
        this.isConnected = false;
        console.log('Failed to connect to MQTT broker');
        if (this.onConnectionFailure) this.onConnectionFailure();
      },
    });
  }


  onConnectionLost(responseObject: Object) {
    this.isConnected = false;
    console.log(`Connection lost: ${responseObject.errorMessage}`);
    setTimeout(() => {
      this.connect();
    }, this.reconnectTimeout || 5000);
  }

  onMessageArrived(message: Paho.Message) {
    console.log(`Message arrived on topic ${message.destinationName}: ${message.payloadString}`);
  }

  subscribe(topic: string) {
    if (!this.isConnected) {
      console.log('Not connected to MQTT broker');
      return;
    }
    console.log(`Subscribing to topic ${topic}`);
    this.client.subscribe(topic);
  }

  publish(topic: string, payload: string) {
    if (!this.isConnected) {
      console.log('Not connected to MQTT broker');
      return;
    }
    const message = new Paho.Message(payload);
    message.destinationName = topic;
    this.client.send(message);
  }

  disconnect() {
    this.client.disconnect();
    this.isConnected = false;
  }
}
