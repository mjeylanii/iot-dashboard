import initialSettings from '$lib/constants/initialSettings';
import sanitizeInput from '$lib/helpers/inputHelper';
import type { MQTT, Pocketbase, Settings, WebSocket } from '$lib/types';
import { Store } from 'tauri-plugin-store-api';

const store = new Store('.settings.dat');

const storeInit = async () => {
	try {
		// const settings = (await store.get('settings')) || initialSettings;
		const settings = initialSettings;

		await store.set('settings', settings);
	} catch (error) {
		console.error('Error initializing settings:', error);
	}
};

const getPocketbase = async () => {
	try {
		const settings: Settings | null = await store.get('settings');
		if (settings !== null) {
			return settings.Pocketbase;
		}
	} catch (error) {
		console.error('Error retrieving settings:', error);
	}
};

const getMQTT = async () => {
	try {
		const settings: Settings | null = await store.get('settings');
		if (settings !== null) {
			return settings.MQTT;
		}
	} catch (error) {
		console.error('Error retrieving settings:', error);
	}
};

const getWebSocket = async () => {
	try {
		const settings: Settings | null = await store.get('settings');
		if (settings !== null) {
			return settings.WebSocket;
		}
	} catch (error) {
		console.error('Error retrieving settings:', error);
	}
};
const setPocketbase = async (settings: Pocketbase) => {
	try {
		await store.set('settings', { ...store.get('settings'), Pocketbase: settings });
	} catch (error) {
		console.error('Error setting Pocketbase settings:', error);
	}
};
const setMQTT = async (settings: MQTT) => {
	try {
		await store.set('settings', { ...store.get('settings'), MQTT: settings });
	} catch (error) {
		console.error('Error setting MQTT settings:', error);
	}
};

const setWebSocket = async (settings: WebSocket) => {
	try {
		await store.set('settings', { ...store.get('settings'), WebSocket: settings });
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
export {
	storeInit,
	getMQTT,
	getWebSocket,
	setMQTT,
	setWebSocket,
	setPocketbase,
	getPocketbase,
	resetSettings
};
