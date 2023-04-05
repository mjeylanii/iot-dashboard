import PocketBase from 'pocketbase';
import { temperature } from '$lib/store';
const pb = new PocketBase('http://127.0.0.1:8090');

export async function getTemperatures() {
    const response = await pb.collection("temperatures").getList();
     return  response.items
    
}
