<script lang="ts">
	//@ts-ignore
	import { onMount } from 'svelte';

	import { PUBLIC_OPENWEATHERMAP_API_KEY } from '$env/static/public';
	import { alerts } from '$stores';

	import { fetchWeatherData } from '../api/WeatherAPI';

	let weatherData = {
		main: {
			temp: 0,
			feels_like: 0,
			temp_min: 0,
			temp_max: 0,
		},
		weather: [
			{
				main: '',
				description: '',
				icon: '',
			},
		],
		dt: 0,
		name: '',
	};
	let isLoading = true;
	let coords: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 };

	onMount(async () => {
		await fetch('https://ipapi.co/json/')
			.then((res) => res.json())
			.then((res) => {
				coords.latitude = res.latitude;
				coords.longitude = res.longitude;
			});
		await fetchWeatherData(
			PUBLIC_OPENWEATHERMAP_API_KEY,
			coords.latitude.toString(),
			coords.longitude.toString(),
		)
			.then((res) => {
				if (res === undefined) return;

				weatherData = res;
				isLoading = false;
			})
			.catch((res) => {
				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length++,
						type: 'error',
						message: 'Unable to fetch weather data',
						time: new Date(),
					},
				]);
			});
	});
</script>

{#if isLoading}
	Loading
{:else}
	<div class="flex justify-between p-12 shadow-md rounded-xl bg-base-200">
		<div class="flex flex-row items-center justify-center gap-8">
			<img
				class="w-24 h-24"
				src={`./weather-icons/${weatherData.weather[0].icon}.svg`}
				alt="Weather icon"
			/>
			<div class="location">
				<p class="text-2xl font-bold">{weatherData.name}</p>
				{weatherData.weather[0].description}
			</div>
		</div>
		<div class="flex flex-col items-center gap-4 text-center">
			<div class="date">
				<p class="text-2xl font-semibold">
					{new Date(weatherData.dt * 1000).toLocaleDateString('en-US', {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
				</p>
			</div>
			<div class="flex flex-col gap-2 temperature">
				<p class="text-2xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
				<span>Feels like: {Math.round(weatherData.main.feels_like)}°C</span>

				<div class="">
					<span class="">Min: {Math.round(weatherData.main.temp_min)}°C</span>
					<span class="">Max: {Math.round(weatherData.main.temp_max)}°C</span>
				</div>
			</div>
		</div>
	</div>
{/if}
