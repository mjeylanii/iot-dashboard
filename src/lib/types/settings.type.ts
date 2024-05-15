type Settings = {
	MQTT: MQTTSettings;
	WebSocket: WebSocketSettings;
	Pocketbase: PocketbaseSettings;
};

type MQTTSettings = {
	BROKER_IP: string;
	BROKER_PORT: number;
	BROKER_USERNAME: string;
	BROKER_PASSWORD: string;
	CLIENT_ID: string;
	topics: [];
};

type WebSocketSettings = {
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

type PocketbaseSettings = {
	host: string;
	user: string;
	password: string;
	database: string;
	port: number;
};

export type { Settings, MQTTSettings, WebSocketSettings, PocketbaseSettings };
