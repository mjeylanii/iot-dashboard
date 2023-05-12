import {invoke } from '@tauri-apps/api/tauri';
export async function fetchDevicesData() {
    const response = await invoke('get_devices').then((res: any) => {
        return res

    });
    return response;

}

export async function getIoTDevices() {

}