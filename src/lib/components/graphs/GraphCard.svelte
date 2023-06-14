<script lang="js">
	// @ts-nocheck
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { temperature, humidity, pressure } from '$lib/stores/sensors';
	export let chartId = '';
	export let options;
	export let data;
	let chart;
	//Get last object from the store array and return the value
	let store = chartId == 'Humidity' ? humidity : chartId == 'PSI' ? pressure : temperature;

	//Place holder network traffic data
	onMount(async () => {
		var ctx = document.getElementById(chartId).getContext('2d');
		var chart = new Chart(ctx, {
			type: 'line',
			data: {
				//1 to 60
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
						data: [],

						fill: 'start',
						pointRadius: chartId == 'Network Traffic' ? 3 : 0,
						pointHitRadius: 3
					}
				]
			},
			options: options
		});
		function addData(label, data) {
			if (typeof data == undefined && chart) return;
			if (chart.data.labels.length > 60) {
				//Remove last 10
				chart.data.labels.splice(0, 10);

				chart.data.datasets.forEach((dataset) => {
					dataset.data.splice(0, 10);
				});
			}
			chart.data.labels.push(new Date(label).getSeconds());
			chart.data.datasets.forEach((dataset) => {
				dataset.data.push(data);
			});
			chart.update();
		}

		store.subscribe((value) => {
			//Skip the first value
			if (value.length > 1) {
				//Get the last value
				let lastValue = value[value.length - 1];
				//Add the value to the chart
				addData(lastValue.time, lastValue.value);
			}
		});
	});
</script>

<div class="w-full h-full">
	<div class="mx-2 md:flex">
		<div class="w-full px-2">
			<div class="mb-4 border rounded-lg shadow-md dark:border-none bg-base-100">
				<div class="relative overflow-hidden rounded-lg shadow-md">
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
							<p class="text-lg font-bold leading-tight uppercase">{chartId}</p>
						</div>
						<h3 class="mt-4 mb-12 text-3xl font-semibold leading-tight">
							{data == undefined ? '0' : data}
							{chartId == 'Humidity'
								? '%'
								: chartId == 'PSI'
								? 'PSI'
								: chartId == 'Temperature'
								? '°C'
								: 'Mbps'}
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
