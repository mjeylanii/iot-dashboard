import { invoke } from '@tauri-apps/api/core';

export default async function FetchNetworkDevicesDataAPI() {
	try {
		const response = await invoke<string>('get_network_devices');

		return response;
	} catch (error) {
		console.error('Caught error', error);
	}
}
