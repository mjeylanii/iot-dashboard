<script lang="js">
	// @ts-nocheck

	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { temperature } from '$lib/store.js';
	export let chartId = '';
	export let data;
	export let options;
	let min;
	let max;

	switch (chartId) {
		case 'Humidity':
			break;
		case 'PSI':
			break;
		case 'Temperature':
			min = 0;
			break;
	}

	//Place holder network traffic data
	onMount(async () => {
		console.log(chartId);
		console.log(data);

		var ctx = document.getElementById(chartId).getContext('2d');
		var chart = new Chart(ctx, {
			type: 'line',
			data: {
				//1 to 60
				labels:
					chartId == 'Temperature'
						? [...Array(10).keys()]
						: [...Array(60).keys()].map((i) => i * 10),

				datasets: [
					{
						//Color according to chartId
						borderColor:
							chartId == 'Humidity'
								? '#4c51bf'
								: chartId == 'PSI'
								? '#f56565'
								: chartId == 'Temperature'
								? '#4299e1'
								: '#38a169',
						//RGB colors
						backgroundColor:
							chartId == 'Humidity'
								? 'rgba(76, 81, 191, 0.1)'
								: chartId == 'PSI'
								? 'rgba(245, 101, 101, 0.1)'
								: chartId == 'Temperature'
								? 'rgba(66, 153, 225, 0.1)'
								: 'rgba(56, 161, 105, 0.1)',

						borderWidth: 1,
						// data: $temperature,
						//Scale data from 0 to 100 using $temperature
						data:
							chartId == 'Temperature'
								? data
								: [...Array(60).keys()].map((i) => Math.random() * 10),
						fill: 'start',
						pointRadius: chartId == 'Network Traffic' ? 3 : 0,
						pointHitRadius: 3
					}
				]
			},
			options: options
		});
	});
</script>

<div class="w-full h-full">
	<div class="mx-2 md:flex">
		<div class="w-full px-2">
			<div class="mb-4 border rounded-lg shadow-xl">
				<div class="relative overflow-hidden bg-white rounded-lg shadow-lg md:shadow-xl">
					<div
						class="relative z-10 px-3 pt-8 pb-10 text-center {chartId == 'Network Traffic'
							? 'h-96'
							: ''}"
					>
						<div class="flex items-center gap-2">
							<img
								class="w-6 h-6"
								alt={chartId == 'Humidity'
									? 'Humidity'
									: chartId == 'PSI'
									? 'PSI'
									: chartId == 'Temperature'
									? 'Temperature'
									: 'Network Traffic'}
								src={chartId == 'Humidity'
									? 'icons/sensors/humidity.svg'
									: chartId == 'PSI'
									? 'icons/sensors/gauge.svg'
									: chartId == 'Temperature'
									? 'icons/sensors/thermostat.svg'
									: 'icons/sensors/network.svg'}
							/>
							<p class="text-lg font-bold leading-tight text-gray-500 uppercase">{chartId}</p>
						</div>
						<!-- <h3 class="my-3 text-3xl font-semibold leading-tight text-gray-700">3,682</h3> -->
						<h3 class="mb-12 mt-4 text-3xl font-semibold leading-tight text-gray-700">
							{chartId == 'Temperature'
								? $temperature
								: chartId == 'Humidity'
								? '50'
								: chartId == 'PSI'
								? '50'
								: '50'}
						</h3>
					</div>
					<div class="absolute inset-x-0 bottom-0">
						<canvas id={chartId} height={chartId == 'Network Traffic' ? '250' : '70'} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
