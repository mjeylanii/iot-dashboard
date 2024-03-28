<script lang="ts">
	import { onMount } from 'svelte';

	import { getWebSocket } from '$helpers';
	import { humidityOptions, psiOptions, temperatureOptions } from '$lib/chart_options/index';
	import GraphCard from '$lib/components/graphs/GraphCard.svelte';
	import { alerts, sensors } from '$stores';

	let ws: WebSocket;
	let response = '';
	$: data = {
		temperature: 0,
		humidity: 0,
		pressure: 0,
	};
	onMount(async () => {
		if (ws && ws.readyState == 1) {
			console.log('Websocket is already connected');
			ws.close();
		} else {
			getWebSocket().then((vals: any) => {
				ws = new WebSocket(`ws://${vals.host}:${vals.port}/ws${vals.topics.climate}`);
				ws.onopen = () => {
					console.log('Websocket is connected');
					alerts.update((alerts) => [
						...alerts,
						{
							id: alerts.length + 1,
							type: 'success',
							message: 'Successfully connected to the server',
							time: new Date(),
						},
					]);
				};
				ws.onmessage = (event) => {
					response = event.data;
					let timestamp = new Date().getTime();
					let parsedResponse = JSON.parse(response);
					console.log(parsedResponse);
					data = parsedResponse;
					console.log(data);
					temperature.update((value) => {
						value.push({ time: timestamp, value: parsedResponse.temperature });
						return value;
					});
					humidity.update((value) => {
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

					alerts.update((alerts) => [
						...alerts,
						{
							id: alerts.length + 1,
							type: 'warning',
							message: 'Server closed connection',
							time: new Date(),
						},
					]);
				};

				ws.onerror = (event) => {
					alerts.update((alerts) => [
						...alerts,
						{
							id: alerts.length + 1,
							type: 'error',
							message: 'Error connecting to websocket',
							time: new Date(),
						},
					]);
				};
			});
		}
	});
</script>

<div class="flex flex-col">
	<div class="divider">
		<h1 class="text-2xl font-medium">Sensors</h1>
	</div>
	<div class="flex flex-col justify-start w-full gap-4 lg:flex-row md:flex-row">
		<GraphCard data={data.humidity} chartId={'Humidity'} options={humidityOptions} />
		<GraphCard data={data.pressure} chartId={'PSI'} options={psiOptions} />
		<GraphCard data={data.temperature} chartId={'Temperature'} options={temperatureOptions} />
	</div>
</div>
