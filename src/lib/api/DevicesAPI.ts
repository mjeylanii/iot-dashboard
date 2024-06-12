import type { Host, Interface } from '$types';

import { invoke } from '@tauri-apps/api/core';

export default async function FetchNetworkDevicesDataAPI(): Promise<Host[]> {
	try {
		const found = (await invoke('get_interfaces')) as Interface[];

		const response = (await invoke('scan_network', { interface: found[0] })) as Host[];

		return response;
	} catch (error) {
		console.error('Caught error', error);
		return [];
	}
}
