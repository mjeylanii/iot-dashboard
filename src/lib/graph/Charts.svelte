<script lang="ts">
	import { onMount } from 'svelte';
	import { humidity, temperature } from '$lib/store.js';
	import GraphCard from '$lib/graph/GraphCard.svelte';
	import { getTemperatures } from '$lib/api/TemperatureAPI';
	import { psiOptions } from '$lib/chart-options/psi';
	import { humidityOptions } from '$lib/chart-options/humidity';
	import { temperatureOptions } from '$lib/chart-options/temperature';

	let temperatureData: { x: Date; y: number }[] = [];
	let fetching = true;
	onMount(async () => {
		await getTemperatures()
			.then(
				(res) =>
					(temperatureData = res.map((item) => {
						return { x: new Date(item.created), y: item.temperature };
					}))
			)
			.finally(() => (fetching = false));
	});
</script>

<div class="flex flex-col">
	<div class="divider">
		<h1 class="text-2xl font-medium">Sensors</h1>
	</div>
	<div class="flex flex-col justify-start w-full gap-4 lg:flex-row md:flex-row">
		{#if fetching == true}
			<p>Fetching data...</p>
		{:else}
			<GraphCard chartId={'Humidity'} data options={humidityOptions} />,
			<GraphCard chartId={'PSI'} data options={psiOptions} />,
			<GraphCard chartId={'Temperature'} data={temperatureData} options={temperatureOptions} />
		{/if}
	</div>
</div>
