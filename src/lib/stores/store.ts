import { writable } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';

export const mqtt = writable();
export const lightStore = writable([]);

export const people = writable([{ name: '', status: '', time: Date }]);

export const alerts = writable([
	{ id: 1, type: 'info', message: 'Welcome to the dashboard', time: new Date() }
]);
