import { mqtt } from '$lib/store.js';
export function GetLightStates() {
  mqtt.subscribe(client => {
    client.subscribe('light/+/state');
    });
}

export function getTemperature() {
  mqtt.subscribe(client => {
    client.subscribe('office/temperature');
    });
}