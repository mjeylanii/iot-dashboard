import { alerts } from '$lib/stores/store';
import {lights} from '$lib/stores/devices';

class LightsWebSocketService {
    ws!: WebSocket;
    response = '';
  
    constructor(private url: string) {}
  
    connect(): void {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket is already connected');
        this.close();
      } else {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
      }
    }
  
    close(): void {
      this.ws.close();
    }
  
    onOpen(): void {
      console.log('WebSocket is connected');
      alerts.update((alerts) => [
        ...alerts,
        {
          id: alerts.length + 1,
          type: 'success',
          message: 'Successfully connected to the server',
          time: new Date(),
        },
      ]);
    }
  
    onMessage(event: MessageEvent): void {
      this.response = event.data;
      if(this.response == undefined) return;
      const parsedResponse = JSON.parse(this.response);
     //console.log(parsedResponse);
      // Handle the received light data
      console.log(parsedResponse.lights);
    lights.set(
        parsedResponse.lights
    )
    }
  
    onClose(event: CloseEvent): void {
      if (event.reason === '') return;
      console.log(event);
      console.log('WebSocket is closed');
      alerts.update((alerts) => [
        ...alerts,
        {
          id: alerts.length + 1,
          type: 'warning',
          message: 'Server closed connection',
          time: new Date(),
        },
      ]);
    }
  
    onError(event: Event): void {
      console.log(event);
      console.log('Error connecting to the server');
      alerts.update((alerts) => [
        ...alerts,
        {
          id: alerts.length + 1,
          type: 'error',
          message: 'Error connecting to WebSocket',
          time: new Date(),
        },
      ]);
    }
  
    sendLightCommand(lightId: string, command: string): void {
      // Create and send the light command to the server
      const lightCommand = { id: lightId, command };
      this.ws.send(JSON.stringify(lightCommand));
    }
  }
  
  export default LightsWebSocketService;
  