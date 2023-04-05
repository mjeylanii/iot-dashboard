<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchDevicesData } from '../lib/api/DevicesAPI';
	let loading = true;
	let devices: any;
	onMount(async () => {
		devices = await fetchDevicesData()
			.then((res) =>
				res.map((device: { hostname: string; mac: string }) => {
					if (!device.hostname.includes(' (') || !device.hostname.includes(')')) return device;
					const hostname = device.hostname.split(' (')[0];
					const ip = device.hostname.split(' (')[1].replace(')', '');
					return { ...device, hostname, ip };
				})
			)
			.catch((err) => {
				console.error(err);
				return [];
			});
	});
</script>

<div
	class="container flex flex-col items-center justify-center p-4 mx-auto bg-white rounded-lg shadow-lg"
>
	<h1 class="text-xl font-bold">Devices</h1>
	<br />
	<table class="table w-full">
		<thead>
			<tr>
				<th />
				<th class="text-left">Devices</th>
				<th class="text-left">IP</th>
				<th class="text-left">MAC</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if devices == null && loading == true}
				<tr>
					<td colspan="5" class="text-center"> Loading... </td>
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
						<th>
							<button class="btn btn-ghost btn-xs">details</button>
						</th>
					</tr>
				{/each}
			{/if}
		</tbody>
		<!-- Footer -->
		<tfoot>
			<tr>
				<td colspan="5" class="text-center">
					<button
						on:click={async () => {
							loading = true;
							devices = await fetchDevicesData()
								.then((res) =>
									//Ts ignore
									//@ts-ignore
									res.map((device) => {
										if (!device.hostname.includes(' (') || !device.hostname.includes(')'))
											return device;
										const hostname = device.hostname.split(' (')[0];
										const ip = device.hostname.split(' (')[1].replace(')', '');
										return { ...device, hostname, ip };
									})
								)
								.catch((err) => {
									console.error(err);
									return [];
								});
						}}
						class="btn btn-ghost btn-xs">Refresh</button
					>
				</td>
			</tr>
		</tfoot>
	</table>
</div>
