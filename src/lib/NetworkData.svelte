<script lang="ts">
	//Get network traffic
	const ssr = false;
	import { onMount } from 'svelte';
	import { fetchNetworkData } from '../lib/api/NetworkAPI';
	let networkData: any;
	onMount(async () => {
		networkData = await fetchNetworkData();
		console.log(networkData);
	});
</script>
