import type { MQTTSettings, PocketbaseSettings, Settings, WebSocketSettings } from '$types';

import initialSettings from '$lib/constants/initialSettings';

import { Store } from '@tauri-apps/plugin-store';

export default class StorageHelper {
	private store = new Store('.settings.dat');

	public storeInit = async () => {
		try {
			// const settings = (await store.get('settings')) || initialSettings;
			const settings = initialSettings;

			await this.store.set('settings', settings);
		} catch (error) {
			console.error('Error initializing settings:', error);
		}
	};

	public getPocketbase = async (): Promise<PocketbaseSettings> => {
		try {
			const settings: Settings | null = await this.store.get<Settings>('settings');

			if (!settings) return initialSettings.Pocketbase;

			return settings.Pocketbase;
		} catch (error) {
			console.error('Error retrieving settings:', error);
			return initialSettings.Pocketbase;
		}
	};

	public getMQTT = async (): Promise<MQTTSettings> => {
		try {
			const settings: Settings | null = await this.store.get<Settings>('settings');

			if (!settings) return initialSettings.MQTT;

			return settings.MQTT;
		} catch (error) {
			console.error('Error retrieving settings:', error);
			throw error;
		}
	};

	public getWebSocket = async (): Promise<WebSocketSettings> => {
		try {
			const settings: Settings | null = await this.store.get('settings');

			if (!settings) return initialSettings.WebSocket;

			return settings.WebSocket;
		} catch (error) {
			console.error('Error retrieving settings:', error);
			throw error;
		}
	};

	public setPocketbase = async (settings: PocketbaseSettings) => {
		try {
			await this.store.set('settings', { ...this.store.get('settings'), Pocketbase: settings });
		} catch (error) {
			console.error('Error setting Pocketbase settings:', error);
		}
	};

	public setMQTT = async (settings: MQTTSettings) => {
		try {
			await this.store.set('settings', { ...this.store.get('settings'), MQTT: settings });
		} catch (error) {
			console.error('Error setting MQTT settings:', error);
		}
	};

	public setWebSocket = async (settings: WebSocketSettings) => {
		try {
			await this.store.set('settings', { ...this.store.get('settings'), WebSocket: settings });
		} catch (error) {
			console.error('Error setting WebSocket settings:', error);
		}
	};

	public resetSettings = async () => {
		try {
			await this.store.set('settings', initialSettings);
		} catch (error) {
			console.error('Error resetting settings:', error);
		}
	};
}
