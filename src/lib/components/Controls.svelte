<script>
	import { onMount } from 'svelte';
	import { alerts } from '$lib/stores/store';
	import Lights from './controls/Lights.svelte';
	import { ws_config } from '$lib/config/default/websocket.conf.ts';
	//import { lights } from '$lib/config/default/devices.conf.ts';
	import LightsWebSocketService from '$lib/utils/lightsWebSocket';
	import { lights } from '$lib/stores/devices';
	let LightsArr = [];
	onMount(async () => {
		let lightsWs = new LightsWebSocketService(
			`ws://${ws_config.host}:${ws_config.port}/ws${ws_config.topics.lights}`
		);
		lightsWs.connect();
	});
	lights.subscribe((value) => {
		LightsArr = value;
	});
</script>

<div
	class="grid items-center justify-center grid-flow-row grid-cols-2 gap-4 lg:grid-cols-4 select-none"
>
	{#each LightsArr as light}
		<Lights {light} />
	{/each}
</div>
