import { Store } from 'tauri-plugin-store-api';
import sanitizeInput from '$lib/helpers/inputHelper';

const store = new Store('.settings.dat'); // **Use a secure storage mechanism**

const initialSettings = {
	MQTT: {
        BROKER_IP: '192.168.1.111',
        BROKER_PORT: 8080,
        BROKER_USERNAME: 'mqtt_user',
        BROKER_PASSWORD: 'mqtt_password',
        CLIENT_ID: "web" + new Date().getTime(),
		topics: []
	},
	WebSocket: {
		host: 'localhost',
		port: 8080,
		username: '',
		password: '', // Encrypt before storing
		protocol: 'ws',
		path: '/ws'
	},
    db: {
        host: '192.168.0.116',
        user: 'XXXX',
        password: 'XXXX',
        database: 'XXXX',
        port: 8090,
    }
};

const storeInit = async () => {
	try {
		const settings = (await store.get('settings')) || initialSettings;
		// Encrypt sensitive data in settings before storing
		await store.set('settings', settings);
	} catch (error) {
		console.error('Error initializing settings:', error);
	}
};

const getMQTT = async () => {
	try {
		const settings = await store.get('settings').then((vals: any) => {
			return vals.MQTT;
		});
	} catch (error) {
		console.error('Error getting MQTT settings:', error);
		return {};
	}
};

const getWebSocket = async () => {
	try {
		const settings = await store.get('settings').then((vals: any) => {
			return vals.WebSocket;
		});
	} catch (error) {
		console.error('Error getting WebSocket settings:', error);
		return {};
	}
};

const setMQTT = async (settings: any) => {
	try {
		// Validate and sanitize input before updating
		const validatedSettings = sanitizeInput(settings);
		await store.set('settings', { ...store.get('settings'), MQTT: validatedSettings });
	} catch (error) {
		console.error('Error setting MQTT settings:', error);
	}
};

const setWebSocket = async (settings: any) => {
	try {
		// Validate and sanitize input before updating
		const validatedSettings = sanitizeInput(settings);
		await store.set('settings', { ...store.get('settings'), WebSocket: validatedSettings });
	} catch (error) {
		console.error('Error setting WebSocket settings:', error);
	}
};

export { storeInit, getMQTT, getWebSocket, setMQTT, setWebSocket };
