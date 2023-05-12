import { writable } from 'svelte/store';

export const light = writable([{ time: 0, value: 0 }]);

export const iotDevices = writable([{ name: 'ESP-32', status: 'online' }]);
