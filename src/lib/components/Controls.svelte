<script>
	import { onMount } from 'svelte';
	import { alerts } from '$lib/stores/store.js';
	import Lights from './controls/Lights.svelte';
	//Office lights
	let lights = [
		{
			name: 'Hallways',
			state: 'on'
		},
		{
			name: 'Main Office',
			state: 'on'
		},
		{
			name: 'Kitchen',
			state: 'on'
		},
		{
			name: "Mohamed's Office",
			state: 'on'
		},
		{
			name: "Joe's Table",
			state: 'off'
		}
	];
</script>

<div
	class="grid items-center justify-center grid-flow-row grid-cols-2 gap-4 lg:grid-cols-4 select-none"
>
	{#each lights as light}
		<Lights {light} />
	{/each}
</div>
