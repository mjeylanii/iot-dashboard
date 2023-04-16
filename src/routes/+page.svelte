<script lang="ts">
	import DeviceStats from '$lib/DeviceStats.svelte';
	import GraphCard from '$lib/graph-components/GraphCard.svelte';
	import LightsControl from '$lib/LightsControl.svelte';
	import Devices from '$lib/Devices.svelte';
	import Weather from '$lib/Weather.svelte';
	import Person from '$lib/Person.svelte';
	import Device from '$lib/Device.svelte';
	import AddDevice from '$lib/AddDevice.svelte';
	import { onMount } from 'svelte';
	import PocketBase from 'pocketbase';
	import Charts from '$lib/graph-components/Charts.svelte';
	import { netOptions } from '$lib/chart-options/network-traffic';
	import AddPersom from '$lib/AddPerson.svelte';
	import WelcomeCard from '$lib/WelcomeCard.svelte';
	import SettingsModal from '$lib/modals/SettingsModal.svelte';
	import InfoModal from '$lib/modals/InfoModal.svelte';
	import { invoke } from '@tauri-apps/api/tauri';

	let persons = [
		{
			name: 'John Doe',
			status: 'online'
		},
		{
			name: 'Jane Doe',
			status: 'offline'
		},
		{
			name: 'Frank Doe',
			status: 'online'
		}
	];
	let welcomeVisible = true;
	//Timeout to hide welcome card

	//Get prefered color scheme
	onMount(() => {
		//Check if color scheme is set
		let colorScheme = localStorage.getItem('colorScheme');
		//If not set, set to dark
		console.log(colorScheme);
		//Delay 10 seconds
		setTimeout(() => {
			welcomeVisible = false;
		}, 10000);
		invoke('close_splashscreen');
	});
</script>

<SettingsModal />
<InfoModal />
<div class="flex flex-col gap-12">
	<!-- Wearther -->
	<div class="flex flex-col justify-center gap-4">
		<WelcomeCard />
		<Weather />
	</div>
	<h2 class="px-4 text-3xl font-bold">Controls</h2>
	<div class="text-xl font-medium divider">IoT Devices</div>
	<div class="flex flex-col justify-center gap-4">
		<div class="grid grid-cols-3 gap-4">
			<Device />
			<Device />
			<Device />
			<AddDevice />
		</div>
	</div>

	<div class="text-xl font-medium divider">Lights</div>
	<div class="relative flex flex-col justify-center gap-4">
		<LightsControl />
	</div>

	<Charts />

	<div class="flex flex-col justify-center gap-8 mx-auto lg:w-full">
		<div class="divider">
			<h2 class="text-2xl font-medium">People</h2>
		</div>
		<div class="flex flex-row justify-center gap-8 mx-auto lg:w-full">
			{#each persons as person}
				<Person {person} />
			{/each}
			<AddPersom />
		</div>
	</div>
	<h2 class="px-4 text-3xl font-bold">Network</h2>
	<div class="flex flex-col w-full gap-4">
		<Devices />
		<GraphCard chartId={'Network Traffic'} options={netOptions} />
	</div>
</div>
