import {invoke } from '@tauri-apps/api/tauri';

//Export fetchDevicesData function
export async function fetchDevicesData() {
    const response = await invoke('get_devices').then((res) => {
        return res;
    });
    return response;
}