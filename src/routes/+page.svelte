<script lang="ts">
	import DeviceStats from '$lib/DeviceStats.svelte';
	import GraphCard from '$lib/GraphCard.svelte';
	import LightsControl from '$lib/LightsControl.svelte';
	// import WelcomeCard from '$lib/WelcomeCard.svelte';
	import { weatherData, networkTraffic, PSI, humidity } from '$lib/PlaceholderData';
	import Devices from '$lib/Devices.svelte';
	import Weather from '$lib/Weather.svelte';
	import Person from '$lib/Person.svelte';
	import Device from '$lib/Device.svelte';
	import AddDevice from '$lib/AddDevice.svelte';
	import { onMount } from 'svelte';
	import { MQTT_CONFIG } from '$lib/config/config';
	import mqttClient from '$lib/mqtt';

	import { GetLightStates, getTemperature } from '$lib/api/mqtt-api';

	// import { store } from '$lib/store.js';
	const handleLightMessage = (message: string) => {
		console.log('Light message received');
		console.log(message);
	};
	let client;
	onMount(async () => {
		client = mqttClient;
		client.connect('office/temp');
	});

	let persons = [
		{
			name: 'John Doe',
			status: 'online'
		},
		{
			name: 'Jane Doe',
			status: 'offline'
		},
		{
			name: 'Frank Doe',
			status: 'online'
		}
	];
</script>

<!-- flex items columns and rows -->
<div class="flex flex-col max-w-screen-lg gap-12 mx-auto">
	<!-- Wearther -->
	<div class="flex flex-col justify-center gap-4">
		<!-- <WelcomeCard /> -->
		<Weather />
	</div>
	<h2 class="px-4 text-3xl font-bold">Controls</h2>
	<div class="text-xl font-medium divider">IoT Devices</div>
	<div class="flex flex-col justify-center gap-4">
		<div class="grid grid-cols-3 gap-4">
			<Device />
			<Device />
			<Device />
			<AddDevice />
		</div>
	</div>

	<div class="text-xl font-medium divider">Lights</div>
	<div class="flex flex-col justify-center gap-4">
		<LightsControl />
	</div>

	<div class="divider">
		<h1 class="text-2xl font-medium">Sensors</h1>
	</div>
	<div class="flex flex-col justify-start w-full gap-4 lg:flex-row md:flex-row">
		<GraphCard chartId={'Humidity'} />

		<GraphCard chartId={'PSI'} />

		<GraphCard chartId={'Temperature'} />
	</div>
	<!-- People -->
	<div class="divider">
		<h2 class="text-2xl font-medium">People</h2>
	</div>
	<div class="flex flex-row justify-center gap-8 mx-auto lg:w-full">
		{#each persons as person}
			<Person {person} />
		{/each}
	</div>
	<!-- Network and devices -->
	<h2 class="px-4 text-3xl font-bold">Network</h2>
	<div class="flex flex-col w-full gap-4">
		<Devices />
		<GraphCard chartId={'Network Traffic'} />
	</div>
</div>
