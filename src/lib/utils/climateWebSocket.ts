import { alerts } from '$lib/stores/store';
import { temperature, humidity, pressure} from '$lib/stores/sensors';
class ClimateWebSocketService {
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
      alerts.update((alerts: any) => [
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
      const timestamp = new Date().getTime();
      const parsedResponse = JSON.parse(this.response);
      console.log(parsedResponse);
      const data = parsedResponse;
      console.log(data);
      temperature.update((value: any) => {
        value.push({ time: timestamp, value: parsedResponse.temperature });
        return value;
      });
      humidity.update((value: any) => {
       
        value.push({ time: timestamp, value: parsedResponse.humidity });
        return value;
      });
      pressure.update((value: any) => {
        value.push({ time: timestamp, value: parsedResponse.pressure });
        return value;
      });
    }
  
    onClose(event: CloseEvent): void {
      if (event.reason === '') return;
      console.log(event);
      console.log('WebSocket is closed');
      alerts.update((alerts: any) => [
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
      alerts.update((alerts: any) => [
        ...alerts,
        {
          id: alerts.length + 1,
          type: 'error',
          message: 'Error connecting to WebSocket',
          time: new Date(),
        },
      ]);
    }
  }
  
  export default ClimateWebSocketService;
  