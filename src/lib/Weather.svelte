<script lang="ts">
	import { OPENWEATHERMAP_API_KEY } from '$lib/config.js';
	import { fetchWeatherData } from './api/WeatherAPI';
	import { onMount } from 'svelte';
	let weatherData: any;
	onMount(async () => {
		weatherData = await fetchWeatherData(OPENWEATHERMAP_API_KEY).then((data) => {
			//Change kelvin to celsius
			data.main.temp = data.main.temp - 273.15;
			data.main.feels_like = data.main.feels_like - 273.15;
			data.main.temp_min = data.main.temp_min - 273.15;
			data.main.temp_max = data.main.temp_max - 273.15;
			return data;
		});
	});
</script>

<div>
	{#if weatherData}
		<div class="card w-fit h-fit bg-base-100 shadow-xl">
			<figure class="px-10 pt-10">
				<!-- <div class="weather-icon">
				<img
					src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
					alt="Weather icon"
				/> -->

				<div class="temperature">
					<p class="text-6xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
				</div>
			</figure>
			<!-- The location  -->
			<div class="card-body items-center text-center">
				<div class="location">
					<p class="text-2xl font-bold">{weatherData.name}</p>
				</div>
				<!-- Date -->
				<div class="date">
					<p class="font-semibold text-gray-400">
						{new Date(weatherData.dt * 1000).toLocaleDateString('en-US', {
							weekday: 'long',
							month: 'long',
							day: 'numeric',
							year: 'numeric'
						})}
					</p>
				</div>
				<div class="temperature-description">
					{weatherData.weather[0].description}
				</div>
				<div class="temperature">
					<span>Min: {Math.round(weatherData.main.temp_min)}°C</span>
					<span>Max: {Math.round(weatherData.main.temp_max)}°C</span>
				</div>
			</div>
		</div>
	{:else}
		<div class="card w-fit h-fit bg-base-100 shadow-xl">
			<div class="card-body items-center text-center">
				<p class="text-2xl font-bold">Loading...</p>
			</div>
		</div>
	{/if}
</div>
