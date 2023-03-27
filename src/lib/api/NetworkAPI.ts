//Get network traffic data from Rust
import {invoke } from '@tauri-apps/api/tauri';

//Export fetchNetworkData function
export async function fetchNetworkData() {
    const response = await invoke('get_network_traffic').then((res) => {
        return res;
    });
    return response;
}