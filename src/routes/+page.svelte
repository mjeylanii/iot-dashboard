<script lang="ts">
	import DeviceStats from '$lib/DeviceStats.svelte';
	import GraphCard from '$lib/graph/GraphCard.svelte';
	import LightsControl from '$lib/LightsControl.svelte';
	// import WelcomeCard from '$lib/WelcomeCard.svelte';
	import { weatherData, networkTraffic, PSI, humidity } from '$lib/PlaceholderData';
	import Devices from '$lib/Devices.svelte';
	import Weather from '$lib/Weather.svelte';
	import Person from '$lib/Person.svelte';
	import Device from '$lib/Device.svelte';
	import AddDevice from '$lib/AddDevice.svelte';
	import { onMount } from 'svelte';
	import mqttClient from '$lib/mqtt';
	import { MQTT_TOPICS } from '$lib/config/mqtt.conf';
	import type { Message } from 'paho-mqtt';
	import PocketBase from 'pocketbase';
	import Charts from '$lib/graph/Charts.svelte';
	import { netOptions } from '$lib/chart-options/network-traffic';
	import { temperature as temperatureStore } from '$lib/store';

	let temperatureArr: object[] = [];

	const pb = new PocketBase('http://127.0.0.1:8090');

	const handleMessage = (message: Message) => {
		const topic = message.destinationName;
		const payload = message.payloadString;
		switch (topic) {
			case MQTT_TOPICS.temperature:
				if (!isNaN(parseFloat(payload))) {
					temperatureStore.set(parseFloat(payload).toFixed(1));
					temperatureArr.push({
						x: new Date(),
						y: parseFloat(payload)
					});
					pb.collection('temperatures')
						.create({
							temperature: parseFloat(payload)
						})
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.error(err);
						});
				}
				break;
			case MQTT_TOPICS.humidity:
				break;
			case MQTT_TOPICS.networkTraffic:
				break;
			default:
				break;
		}
	};

	let client: mqttClient;
	onMount(() => {
		client = new mqttClient(handleMessage);
		client.connect({
			onSuccess: () => {
				console.log('Connected to MQTT');
				//Loop throught the topics
				for (const topic in MQTT_TOPICS) {
					client.subscribe(MQTT_TOPICS[topic]);
				}
			},
			onFailure: (err) => {
				console.error(`Failed to connect to MQTT broker : ${err}`);
				try {
					console.error(`Failed to connect to MQTT broker : ${error.errorMessage}`);
					setTimeout(() => {
						client.connect();
					}, 10000);
				} catch (err) {
					console.error(`Error while connecting to MQTT broker: ${err}`);
				}
			}
		});
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
	<!-- Sensors -->
	<Charts />

	<!-- People -->

	<div class="flex flex-col justify-center gap-8 mx-auto lg:w-full">
		<div class="divider">
			<h2 class="text-2xl font-medium">People</h2>
		</div>
		<div class="flex flex-row justify-center gap-8 mx-auto lg:w-full">
			{#each persons as person}
				<Person {person} />
			{/each}
		</div>
	</div>
	<!-- Network and devices -->
	<h2 class="px-4 text-3xl font-bold">Network</h2>
	<div class="flex flex-col w-full gap-4">
		<Devices />
		<GraphCard chartId={'Network Traffic'} data options={netOptions} />
	</div>
</div>
