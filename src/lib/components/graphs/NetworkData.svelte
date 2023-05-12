<script lang="ts">
	//Get network traffic
	import { onMount } from 'svelte';
	import { fetchNetworkData } from '../../api/NetworkAPI';
	let networkData: any;
	onMount(async () => {
		networkData = await fetchNetworkData();
		console.log(networkData);
	});
</script>
