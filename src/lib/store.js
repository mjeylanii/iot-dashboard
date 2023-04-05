import { writable } from 'svelte/store';

export const mqtt = writable();
export const lightStore = writable([]);

export const temperature = writable([]);

export const humidity = writable([]);

export const pressure = writable([]);
