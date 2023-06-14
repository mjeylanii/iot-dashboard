import { ws_config } from "$lib/config/default/websocket.conf";

let ws: WebSocket;

export const connectLightsWebsocket = () => {
    ws = new WebSocket("ws://" + ws_config.host + ":" + ws_config.port + "/lights");
    ws.onopen = () => {
        console.log("Lights websocket connected");
    };
    ws.onclose = () => {
        console.log("Lights websocket disconnected");
    };
    }

export const sendLightsWebsocket = (data: any) => {
    ws.send(JSON.stringify(data));
}

