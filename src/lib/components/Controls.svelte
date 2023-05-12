<script>
	import { onMount } from 'svelte';
	import { alerts } from '$lib/stores/store.js';
	import Lights from './controls/Lights.svelte';
	let devices = [
		{
			name: 'Lights',
			icon: 'lightbulb',
			component: Lights
		}
	];
</script>

<div />
