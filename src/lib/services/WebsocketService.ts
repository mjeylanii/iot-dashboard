import { alerts, devices } from '$stores';

export default class WebSocketService {
	ws!: WebSocket;
	response = '';
	topic = '';

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
	}

	onMessage(event: MessageEvent): void {
		this.response = event.data;
		if (this.response == undefined) return;
		try {
			const parsedResponse = JSON.parse(this.response);
			let devicesArray: any[] = [];
			devices.subscribe((value) => (devicesArray = value));
			const deviceIndex = devicesArray.findIndex((device) => device.id === parsedResponse.id);
			if (deviceIndex === -1) {
				devicesArray.push(parsedResponse);
			} else {
				devicesArray[deviceIndex] = parsedResponse;
				devices.set(devicesArray);
			}
		} catch (err) {
			console.log(err);
		}
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
		console.error(event);
		console.error('Error connecting to the server');
		alerts.update((alerts) => {
			//Check if the alert is already in the array
			const alertIndex = alerts.findIndex(
				(alert) => alert.message == 'Error connecting to the websocket',
			);
			if (alertIndex == -1) {
				return [
					...alerts,
					{
						id: alerts.length + 1,
						type: 'error',
						message: 'Error connecting to the websocket',
						time: new Date(),
					},
				];
			}
			return alerts;
		});
	}

	sendCommand(command: any): void {
		// Create and send the command to the server
		this.ws.send(JSON.stringify(command));
	}
}
