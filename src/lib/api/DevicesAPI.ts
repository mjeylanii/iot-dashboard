import type { Host, Interface } from '$types';

import { invoke } from '@tauri-apps/api/core';

async function FetchNetworkDevicesDataAPI(
	selectedInterface: Interface,
	interfaces: Interface[],
): Promise<Host[]> {
	try {
		const response = (await invoke('scan_network', {
			interface: selectedInterface ?? interfaces[0],
		})) as Host[];

		return response;
	} catch (error) {
		console.error('Caught error', error);
		return [];
	}
}

async function FetchNetworkInterfacesAPI(): Promise<Interface[]> {
	try {
		const response = (await invoke('get_interfaces')) as Interface[];

		return response;
	} catch (error) {
		console.error('Caught error', error);
		return [];
	}
}

export { FetchNetworkDevicesDataAPI, FetchNetworkInterfacesAPI };
