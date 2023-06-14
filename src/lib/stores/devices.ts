import { writable } from 'svelte/store';

export const lights = writable([
	{
		id: '1',
		status: 'off',
		name: 'Meeting Room A'
	},
	{
		id: '2',
		status: 'off',
		name: 'Meeting Room B'
	},
	{
		id: '3',
		status: 'off',
		name: 'Executive Suite'
	},
	{
		id: '4',
		status: 'off',
		name: 'Break Room'
	},
	{
		id: '5',
		status: 'off',
		name: 'Foyer'
	}
]);

export const iotDevices = writable([{ name: 'ESP-32', status: 'online' }]);
