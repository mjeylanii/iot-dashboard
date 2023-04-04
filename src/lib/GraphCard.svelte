<script lang="js">
	// @ts-nocheck

	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	export let chartId = '';
	//Place holder network traffic data
	onMount(async () => {
		const chartOptions = {
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					enabled: chartId == 'Network Traffic' ? true : false
				}
			},
			maintainAspectRatio: false,

			legend: {
				display: chartId == 'Network Traffic' ? true : false
			},
			tooltips: {
				enabled: chartId == 'Network Traffic' ? true : false
			},
			elements: {
				point: {
					radius: 0
				},
				line: {
					tension: 0.5
				}
			},
			scales: {
				y: {
					display: chartId == 'Network Traffic' ? true : false,
					grid: {
						display: chartId == 'Network Traffic' ? true : false
					},
					ticks: {
						display: true
					}
				},
				x: {
					display: chartId == 'Network Traffic' ? true : false,
					grid: {
						display: chartId == 'Network Traffic' ? true : false
					},
					ticks: {
						display: true
					}
				}
			}
		};
		var ctx = document.getElementById(chartId).getContext('2d');
		var chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: [1, 2, 1, 3, 5, 4, 7],
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
						data: data,
						fill: 'start',
						pointRadius: 0,
						pointHitRadius: 10
					}
				]
			},
			options: chartOptions
		});
	});
	export let data = [];
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
						{#if chartId == 'Humidity'}
							<h3 class="my-3 text-3xl font-semibold leading-tight text-gray-700">50%</h3>
						{:else if chartId == 'PSI'}
							<h3 class="my-3 text-3xl font-semibold leading-tight text-gray-700">100</h3>
						{:else if chartId == 'Temperature'}
							<h3 class="my-3 text-3xl font-semibold leading-tight text-gray-700">25°C</h3>
						{:else if chartId == 'Network Traffic'}
							<h3 class="my-3 text-3xl font-semibold leading-tight text-gray-700">100MB</h3>
						{/if}
					</div>
					<div class="absolute inset-x-0 bottom-0">
						<canvas id={chartId} height={chartId == 'Network Traffic' ? '250' : '70'} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
