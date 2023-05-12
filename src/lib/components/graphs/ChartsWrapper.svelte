<script lang="ts">
	import { onMount } from 'svelte';
	import { humidity, temperature, pressure } from '$lib/stores/sensors.js';
	import GraphCard from '$lib/components/graphs/GraphCard.svelte';
	import { psiOptions } from '$lib/chart_options/psi';
	import { humidityOptions } from '$lib/chart_options/humidity';
	import { temperatureOptions } from '$lib/chart_options/temperature';
	import { ws_config } from '$lib/config/default/websocket.conf';
	import { alerts } from '$lib/stores/store';

	let ws: WebSocket;
	let response = '';

	onMount(async () => {
		//Check if the websocket is already connected

		if (ws && ws.readyState == 1) {
			console.log('Websocket is already connected');
			//Close the websocket
			ws.close();
		} else {
			//Connect to the websocket
			ws = new WebSocket(`ws://${ws_config.HOST}:${ws_config.PORT}${ws_config.TOPICS.climate}`);
			ws.onopen = () => {
				console.log('Websocket is connected');

				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length + 1,
						type: 'success',
						message: 'Successfully connected to the server',
						time: new Date()
					}
				]);
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
				if (event.reason == '') return;
				console.log(event);
				console.log('Websocket is closed');
				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length + 1,
						type: 'warning',
						message: 'Server closed connection',
						time: new Date()
					}
				]);
			};

			ws.onerror = (event) => {
				console.log(event);
				console.log('Error connecting to the server');
				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length + 1,
						type: 'error',
						message: 'Error connecting to websocket',
						time: new Date()
					}
				]);
			};
		}
	});
</script>

<!-- {#if error}
	<Alert type="error">There was an error connecting to the websocket</Alert>
{/if} -->
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
