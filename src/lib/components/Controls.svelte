<script>
	import { onMount } from 'svelte';
	import { alerts } from '$lib/stores/store';
	import { Lights } from '$lib/components/controls/index';
	import WebSocketService from '$lib/services/WebsocketService';
	import { devices } from '$lib/stores/store';
	import { getMQTT, getWebSocket } from '$lib/helpers/storageHelper';

	let devicesArr = [];

	onMount(async () => {
		await getWebSocket().then((val) => {
			devicesArr = val.topics.devices;
			devicesArr.forEach((device) => {
				let ws = new WebSocketService(`ws://${val.host}:${val.port}/ws${device.topic}`);
				ws.connect();
				device.service = ws;
			});
			
			devices.set(devicesArr);
		});

		devices.subscribe((value) => {
			console.log('Store', value);
		});
	});
</script>

<div
	class="grid items-center justify-center grid-flow-row grid-cols-2 gap-4 lg:grid-cols-4 select-none"
>
	{#each $devices as device}
		{#if device.type == 'light'}
			<Lights service={device.service} light={device} />
		{/if}
		{#if device.type !== 'light'}
			<p>
				{device.type}
			</p>
		{/if}
	{/each}
</div>
