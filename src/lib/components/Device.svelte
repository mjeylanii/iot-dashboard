<script lang="ts">
	export let device: any;
</script>

<div class="flex max-w-md gap-8 py-6 overflow-hidden rounded-lg shadow-lg bg-base-200">
	<div class="w-1/3">
		<img class="object-cover w-full h-full" src={device.imgUrl} alt="Dlink router" />
	</div>

	<div class="w-2/3 gap-2 space-y-4">
		<h1 class="text-2xl font-bold">
			{device.name}
		</h1>
		<p class="text-lg">
			{device.ip}
		</p>
	</div>
</div>
