import { invoke } from '@tauri-apps/api/tauri';

export default async function fetchNetworkDevicesData() {
	const response = await invoke('get_network_devices').then((res: any) => {
		return res;
	});
	return response;
}
