type Light = {
	id: string;
	name: string;
	state: boolean;
	brightness: number;
	color: string;
	type: string;
	room: string;
	createdAt: string;
};

type Climate = {
	id: string;
	name: string;
	temperature: number;
	humidity: number;
	pressure: number;
	createdAt: string;
};

type Device = {
	id: string;
	name: string;
	state: boolean;
	type: string;
	room: string;
	createdAt: string;
};

type Fan = {
	id: string;
	name: string;
	state: boolean;
	speed: number;
	type: string;
	room: string;
	createdAt: string;
};

type Ac = {
	id: string;
	name: string;
	state: boolean;
	temperature: number;
	mode: string;
	fanSpeed: string;
	room: string;
	createdAt: string;
};

export type { Light, Climate, Device, Fan, Ac };
