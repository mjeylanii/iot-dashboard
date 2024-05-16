<script lang="ts">
	import { onMount } from 'svelte';

	import { fetchNetworkDevicesData } from '$api';
	import { alerts } from '$stores';

	let loading = true;
	let devices: any;
	let error = false;
	onMount(async () => {
		try {
			devices = await fetchNetworkDevicesData().then((res) => {
				const devices = JSON.parse(res);
				return devices;
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
	class="container flex flex-col items-center justify-center p-4 mx-auto rounded-lg shadow-md border"
>
	<h1 class="text-xl font-bold">Devices</h1>
	<br />
	<table class="table w-full">
		<thead>
			<tr>
				<th />
				<th class="text-left">hostname</th>
				<th class="text-left">IP</th>
				<th class="text-left">MAC</th>
				<th class="text-left"> Manufacturer </th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if devices == null || loading == true}
				<tr>
					<td colspan="5" class="text-center">Loading... </td>
				</tr>
			{:else}
				{#each devices as device}
					<tr>
						<td>
							<!-- Device image -->
							<img
								src="https://img.icons8.com/ios/50/000000/router.png"
								alt="Device"
								class="w-8 h-8"
							/>
						</td>
						<td>{device.hostname}</td>
						<td>{device.ip}</td>
						<td>
							{device.mac}
						</td>
						<td>
							{device.manufacturer}
						</td>
						<th>
							<button class="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>
				{/each}
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5" class="text-center">
					<button
						on:click={async () => {
							loading = true;
							try {
								devices = await fetchNetworkDevicesData().then((res) => {
									const devices = JSON.parse(res);
									console.log(devices);
									return devices;
								});
							} catch (err) {
								console.error(err);
								return [];
							} finally {
								loading = false;
							}
						}}
						class="btn btn-ghost btn-xs">Refresh</button
					>
				</td>
				<td />
			</tr>
		</tfoot>
	</table>
</div>
