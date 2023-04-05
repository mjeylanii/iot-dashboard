import {invoke } from '@tauri-apps/api/tauri';

//Export fetchDevicesData function
export async function fetchDevicesData() {
    const response = await invoke('get_devices').then((res: any) => {
        //Turn response into JSON
        return res

    });
    return response;

}