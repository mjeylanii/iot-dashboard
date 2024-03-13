type Settings = {
	MQTT: {
		BROKER_IP: string;
		BROKER_PORT: string;
		BROKER_USERNAME: string;
		BROKER_PASSWORD: string;
		CLIENT_ID: string;
		topics: [];
	};
	WebSocket: {
		host: string;
		port: number;
		username: string;
		password: string;
		protocol: string;
		path: string;
		topics: {
			climate: string;
			devices: {
				type: string;
				topic: string;
				name: string;
				state: boolean;
			}[];
		};
	};
	Pocketbase: {
		host: string;
		user: string;
		password: string;
		database: string;
		port: number;
	};
};

type MQTT = {
	BROKER_IP: string;
	BROKER_PORT: string;
	BROKER_USERNAME: string;
	BROKER_PASSWORD: string;
	CLIENT_ID: string;
	topics: [];
};
type WebSocket = {
	host: string;
	port: number;
	username: string;
	password: string;
	protocol: string;
	path: string;
	topics: {
		climate: string;
		devices: {
			type: string;
			topic: string;
			name: string;
			state: boolean;
		}[];
	};
};

type Pocketbase = {
	Pocketbase: {
		host: string;
		user: string;
		password: string;
		database: string;
		port: number;
	};
};

export type { Settings, MQTT, WebSocket, Pocketbase };
