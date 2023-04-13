<script>
	export let device = {
		name: 'D-link router',
		ip: '192.168.1.1',
		status: 'online'
	};
</script>

<div class="flex max-w-md gap-8 py-6 overflow-hidden rounded-lg shadow-lg">
	<div class="w-1/3">
		<!-- Image of a dlink router -->
		<img
			class="object-cover w-full h-full"
			src="https://www.dlink.com/-/media/global-product-images/consumer/home-networking/routers/r32/product-preview/r32_front.png?mh=150&mw=200&hash=76942BE0E61ACEC4B2A92523AC15E582"
			alt="Dlink router"
		/>
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
