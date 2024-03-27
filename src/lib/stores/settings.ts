import { writable } from 'svelte/store';

export const settings = writable({
	mqtt: { host: ' ', port: ' ', username: ' ', password: ' ' },
	websocket: { host: ' ', port: ' ', username: ' ', password: ' ' },
	weather: { city: ' ', country: ' ' },
	location: { latitude: ' ', longitude: ' ' },
	topics: {
		temperature: 'tempereature',
		humidity: 'humidity',
		pressure: 'pressure',
		light: 'light'
	}
});
