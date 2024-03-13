const initialSettings = {
	MQTT: {
		BROKER_IP: '192.168.1.111',
		BROKER_PORT: 8080,
		BROKER_USERNAME: 'mqtt_user',
		BROKER_PASSWORD: 'mqtt_password',
		CLIENT_ID: 'web' + new Date().getTime(),
		topics: []
	},
	WebSocket: {
		host: 'localhost',
		port: 8080,
		username: '',
		password: '', // Encrypt before storing
		protocol: 'ws',
		path: '/ws',
		topics: {
			climate: '/climate',
			devices: []
		}
	},
	Pocketbase: {
		host: '192.168.0.116',
		user: 'XXXX',
		password: 'XXXX',
		database: 'XXXX',
		port: 8090
	}
};

export default initialSettings;
