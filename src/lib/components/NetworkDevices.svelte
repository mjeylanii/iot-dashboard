<script lang="ts">
	import { onMount } from 'svelte';

	import type { Host, Interface } from '$types';

	import { FetchNetworkDevicesDataAPI, FetchNetworkInterfacesAPI } from '$api';
	import { alerts } from '$stores';

	import SelectInterface from './SelectInterface.svelte';

	let loading = true;
	let devices: Host[];
	let interfaces: Interface[] = [];
	let selectedInterface: Interface;
	let error = false;
	onMount(async () => {
		try {
			interfaces = await FetchNetworkInterfacesAPI().then((res) => {
				return res as Interface[];
			});

			console.log(interfaces);

			devices = await FetchNetworkDevicesDataAPI(selectedInterface, interfaces).then((res) => {
				return res as Host[];
			});
		} catch (err) {
			console.error(err);
			error = true;
			alerts.update((alerts) => [
				...alerts,
				{
					id: alerts.length++,
					type: 'error',
					message: 'Error while fetching devices data',
					time: new Date(),
				},
			]);
			return [];
		} finally {
			loading = false;
		}
	});
</script>

<div
	class="container bg-white flex flex-col items-center justify-center p-4 mx-auto rounded-lg shadow-md border"
>
	<h1 class="text-xl font-bold">Devices</h1>
	<br />

	<SelectInterface {interfaces} />
	<table class="table table-zebra">
		<thead>
			<tr>
				<th class="text-left">hostname</th>
				<th class="text-left">IP</th>
				<th class="text-left">MAC</th>
				<th class="text-left"> Manufacturer </th>
			</tr>
		</thead>
		<tbody>
			{#if loading}
				<tr>
					<td colspan="5" class="text-center">Loading...</td>
				</tr>
			{:else}
				{#each devices as device}
					<tr>
						<td>
							<img
								src="https://img.icons8.com/ios/50/000000/router.png"
								alt="Device"
								class="w-8 h-8"
							/>
						</td>
						<td>{device.host}</td>
						<td>{device.hostname}</td>
						<td>
							{device.mac}
						</td>
						<td>
							{device.vendor}
						</td>
						<th>
							<button class="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
