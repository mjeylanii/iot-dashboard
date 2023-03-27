<script lang="ts">
	export const ssr = false;
	export const prerender = true;
	import { onMount } from 'svelte';
	import { fetchDevicesData } from '../lib/api/DevicesAPI';
	let devices: any;
	onMount(async () => {
		devices = await fetchDevicesData();
		console.log(devices);
	});
</script>

<div
	class="container bg-white p-4 w-fit h-fit flex flex-col justify-center items-center rounded-lg shadow-lg"
>
	<h1 class="text-xl font-bold">Netowrk Devices</h1>
	<br />
	<table class="table w-full">
		<thead>
			<tr>
				<th class="text-left">Devices</th>
				<th class="text-left">IP</th>
				<th />
			</tr>
		</thead>
		<tbody>
			<!-- {#each devices as device}
				<tr>
					<td>{device.name}</td>
					<td>{device.ip}</td>
					<th>
						<button class="btn btn-ghost btn-xs">details</button>
					</th>
				</tr>
			{/each} -->
		</tbody>
	</table>
</div>
