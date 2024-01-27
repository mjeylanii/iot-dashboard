export const ws_config = {
	host: '192.168.0.116',
	port: 1880,
	topics: {
		climate: '/climate',
		devices: [
			{
				
				type: 'light',
				topic: '/light/bedroom',
				name: 'Bedroom Light',
				state: false,
			},
			{
				type: 'light',
				topic: '/light/livingroom',
				name: 'Living Room Light',
				state: false,
			},
			{
				type: 'light',
				topic: '/light/kitchen',
				name: 'Kitchen Light',
				state: false,
			},
            {
				type: 'light',
				topic: '/light/bathroom',
				name: 'Bathroom Light',
				state: false,
			},
			{
				type: 'AC',
				topic: '/ac',
				name: 'Air Conditioner',
				state: false,
			},
			{
				type: 'door',
				topic: '/door',
				name: 'Door',
				state: false,
			}
		]
	}
};
