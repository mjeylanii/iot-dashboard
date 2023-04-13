import {invoke } from '@tauri-apps/api/tauri';
import WebSocket
 from 'tauri-plugin-websocket-api';
//Export fetchDevicesData function
export async function fetchDevicesData() {
    const response = await invoke('get_devices').then((res: any) => {
        //Turn response into JSON
        return res

    });
    return response;

}

export async function getIoTDevices() {
    // const response = await invoke('get_lights').then((res: any) => {
    //     //Turn response into JSON
    //     return res

    // });
    // return response;

}