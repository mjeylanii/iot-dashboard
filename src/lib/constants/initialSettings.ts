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
			devices: [
				{
					type: 'light',
					topic: '/light/bedroom',
					name: 'Bedroom Light',
					state: false
				},
				{
					type: 'light',
					topic: '/light/livingroom',
					name: 'Living Room Light',
					state: false
				},
				{
					type: 'light',
					topic: '/light/kitchen',
					name: 'Kitchen Light',
					state: false
				},
				{
					type: 'light',
					topic: '/light/bathroom',
					name: 'Bathroom Light',
					state: false
				},
				{
					type: 'AC',
					topic: '/ac',
					name: 'Air Conditioner',
					state: false
				},
				{
					type: 'door',
					topic: '/door',
					name: 'Door',
					state: false
				}
			]
		}
	},
	db: {
		host: '192.168.0.116',
		user: 'XXXX',
		password: 'XXXX',
		database: 'XXXX',
		port: 8090
	}
};

export default initialSettings;
