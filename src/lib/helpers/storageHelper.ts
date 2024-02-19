import { Store } from 'tauri-plugin-store-api';
import sanitizeInput from '$lib/helpers/inputHelper';
import initialSettings from '$lib/constants/initialSettings';
const store = new Store('.settings.dat'); // **Use a secure storage mechanism**

const storeInit = async () => {
	try {
		// const settings = (await store.get('settings')) || initialSettings;
		const settings = initialSettings;
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
		return settings;
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
		return settings;
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
const resetSettings = async () => {
	try {
		await store.set('settings', initialSettings);
	} catch (error) {
		console.error('Error resetting settings:', error);
	}
};
export { storeInit, getMQTT, getWebSocket, setMQTT, setWebSocket, resetSettings };
