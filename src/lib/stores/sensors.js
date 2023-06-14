import { writable, readable } from 'svelte/store';

export const temperature = writable([{ time: 0, value: 0 }]);

export const humidity = writable([{ time: 0, value: 0 }]);

export const pressure = writable([{ time: 0, value: 0 }]);

export const hum = writable({ time: 0, value: 0 });
