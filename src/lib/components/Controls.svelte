<script>
	import { onMount } from 'svelte';
	import { alerts } from '$lib/stores/store';
	import { Lights } from '$lib/components/controls/index';
	import { ws_config } from '$lib/config/default/websocket.conf.ts';
	import WebSocketService from '$lib/services/WebsocketService';
	import { devices } from '$lib/stores/store';
	import { dev } from '$app/environment';

	let devicesArr = [];
	devicesArr = ws_config.topics.devices;
	console.log(devicesArr);

	onMount(async () => {
		devicesArr.forEach((device) => {
			let ws = new WebSocketService(`ws://${ws_config.host}:${ws_config.port}/ws${device.topic}`);
			ws.connect();
			device.service = ws;
		});
		devices.set(devicesArr);
		//Display store data
	});
	devices.subscribe((value) => {
		console.log('Store', value);
	});
</script>

<div
	class="grid items-center justify-center grid-flow-row grid-cols-2 gap-4 lg:grid-cols-4 select-none"
>
	{#each $devices as device}
		{#if device.type == 'light'}
			<Lights service={device.service} light={device} />
		{/if}
		<!-- {#if device.type !== 'light'}
			<p>
				{device.type}
			</p>
		{/if} -->
	{/each}
</div>
