<script lang="ts">
	import { onMount } from 'svelte';
	import { humidity, temperature, pressure } from '$lib/utils/store.js';
	import GraphCard from '$lib/graph-components/GraphCard.svelte';
	import { psiOptions } from '$lib/chart-options/psi';
	import { humidityOptions } from '$lib/chart-options/humidity';
	import { temperatureOptions } from '$lib/chart-options/temperature';
	import { ws_config_home, ws_config_office } from '$lib/config/websocket.conf';
	import Alert from '$lib/Alert.svelte';
	//import WebSocket from 'tauri-plugin-websocket-api';

	let ws: WebSocket;
	let response = '';
	let message = '';
	let ws_config = ws_config_home;
	let error = false;

	onMount(async () => {
		//Check if the websocket is already connected
		if (ws && ws.readyState == 1) {
			console.log('Websocket is already connected');
			//Close the websocket
			ws.close();
		} else {
			//Connect to the websocket
			ws = new WebSocket(`ws://${ws_config.HOST}:${ws_config.PORT}/${'ws/climate'}`);
			ws.onopen = () => {
				console.log('Websocket is connected');
			};
			ws.onmessage = (event) => {
				response = event.data;
				//Timestamp
				let timestamp = new Date().getTime();
				//Parse the response
				let parsedResponse = JSON.parse(response);
				//Update the store
				temperature.update((value) => {
					//If length is 60, remove the first element

					value.push({ time: timestamp, value: parsedResponse.temperature });
					return value;
				});
				humidity.update((value) => {
					//If length is 60, remove the first element

					value.push({ time: timestamp, value: parsedResponse.humidity });
					return value;
				});
				pressure.update((value) => {
					value.push({ time: timestamp, value: parsedResponse.pressure });
					return value;
				});
			};
			ws.onclose = (event) => {
				console.log(event);
				console.log('Websocket is closed');
				error = true;
			};

			ws.onerror = (event) => {
				console.log(event);
				console.log('Websocket error');
				error = true;
			};
		}
	});
</script>

{#if error}
	<Alert type="error">There was an error connecting to the websocket</Alert>
{/if}
<div class="flex flex-col">
	<div class="divider">
		<h1 class="text-2xl font-medium">Sensors</h1>
	</div>
	<div class="flex flex-col justify-start w-full gap-4 lg:flex-row md:flex-row">
		<GraphCard chartId={'Humidity'} options={humidityOptions} />
		<GraphCard chartId={'PSI'} options={psiOptions} />
		<GraphCard chartId={'Temperature'} options={temperatureOptions} />
	</div>
</div>
