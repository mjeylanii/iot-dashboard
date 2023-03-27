<script>
	const ssr = false;
	import DeviceStats from '$lib/DeviceStats.svelte';
	import LightsControl from '$lib/LightsControl.svelte';
	import Devices from '../lib/Devices.svelte';
	import Weather from '../lib/Weather.svelte';
</script>

<!-- A responsive grid with auto rows and cols -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-baseline">
	<div class="col-span-1 lg:col-span-1 row-span-1">
		<LightsControl />
	</div>
	<div class="col-span-1 lg:col-span-2 row-span-1 grid grid-cols-2 gap-3">
		<div class="flex gap-2">
			<Devices />
			<Weather />
		</div>
		<div class="col-span-2">
			<DeviceStats />
		</div>
	</div>
</div>
