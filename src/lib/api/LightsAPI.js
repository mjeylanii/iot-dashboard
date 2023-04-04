//Import paho mqtt
import * as Paho from 'paho-mqtt';
//import WebSocket from 'tauri-plugin-websocket-api';
// Create a client instance
// var client = new Paho.Client('192.168.1.111', 8080, 'Client');
// // set callback handlers
// client.onConnectionLost = onConnectionLost;
// client.onMessageArrived = onMessageArrived;

// // connect the client
// client.connect({ onSuccess: onConnect });

// // called when the client connects
// function onConnect() {
// 	//Subscribe to a topic
// 	client.subscribe('office/light/1');
// }

// //Subscribe to a topic

// // called when the client loses its connection
// function onConnectionLost(responseObject) {
// 	if (responseObject.errorCode !== 0) {
// 		console.log('onConnectionLost:' + responseObject.errorMessage);
// 	}
// }

// // called when a message arrives
// async function onMessageArrived(message) {
// 	console.log('onMessageArrived:' + message.payloadString);
// }
// // connect the client


