<script lang="ts">
	import { onMount } from 'svelte';
	import { netOptions } from '$lib/chart_options/networkTraffic';
	import { invoke } from '@tauri-apps/api/tauri';
	import { authenticateWithDatabase, fetchPersonnelData } from '$lib/api/PersonsAPI';
	import { alerts } from '$lib/stores/store';
	import { Store } from 'tauri-plugin-store-api';
	import {
		WeatherCard,
		InfoModal,
		SettingsModal,
		Lights,
		AddDevice,
		Device,
		ChartsWrapper,
		Person,
		AddPerson,
		NetworkDevices
	} from '$components';
	import GraphCard from '$lib/components/graphs/GraphCard.svelte';
	import Controls from '$lib/components/Controls.svelte';

	let personnel: any = [];
	let store = new Store('.settings.dat');

	onMount(async () => {
		try {
			await authenticateWithDatabase('mohamed@office.com', 'Wfax2kz333');
			await fetchPersonnelData().then((res) => {
				personnel = res;
			});
			console.log(personnel);
		} catch (err) {
			alerts.update((alerts) => [
				...alerts,
				{
					id: alerts.length + 1,
					type: 'error',
					message: err.message,
					time: new Date()
				}
			]);
		}
		invoke('close_splashscreen');
	});

	//Recheck database every 5 seconds
	setInterval(async () => {
		try {
			await fetchPersonnelData().then((res) => {
				personnel = res;
			});
		} catch (err) {
			alerts.update((alerts) => [
				...alerts,
				{
					id: alerts.length + 1,
					type: 'error',
					message: err.message,
					time: new Date()
				}
			]);
		}
	}, 5000);
	let devices = [
		{
			name: 'Raspberry Pi',
			ip: '192.168.0.1',
			imgUrl: '/devices/mcu.png',
			manufacturer: 'Raspberry Pi Foundation',
			status: 'online'
		},
		{
			name: 'Raspberry Pi',
			ip: '192.168.0.155',
			imgUrl: '/devices/mcu.png',
			manufacturer: 'Raspberry Pi Foundation',
			status: 'online'
		},
		{
			name: 'ESP-32',
			ip: '192.168.1.1',
			imgUrl: '/devices/mcu.png',
			manufacturer: 'Espressif Systems',
			status: 'online'
		}
	];
</script>

<SettingsModal />
<InfoModal />
<div class="flex flex-col gap-12">
	<div class="flex flex-col justify-center gap-4">
		<!-- <WelcomeCard /> -->
		<WeatherCard />
	</div>
	<h2 class="px-4 text-3xl font-bold">Controls</h2>
	<div class="text-xl font-medium divider">IoT Devices</div>
	<div class="flex flex-col justify-center gap-4">
		<div class="grid grid-cols-3 gap-4">
			{#each devices as device}
				<Device {device} />
			{/each}
			<AddDevice />
		</div>
	</div>

	<div class="text-xl font-medium divider">Controls</div>
	<div class="relative flex flex-col justify-center gap-4">
		<Controls />
	</div>

	<ChartsWrapper />

	<div class="flex flex-col justify-center gap-8 mx-auto lg:w-full">
		<div class="divider">
			<h2 class="text-2xl font-medium">People</h2>
		</div>
		<div class="flex flex-row justify-center gap-8 mx-auto lg:w-full">
			{#await personnel then person}
				{#if personnel == undefined || personnel.length == 0}
					<div class="flex flex-col justify-center gap-4">
						<div class="flex flex-col justify-center gap-4">
							<div class="grid grid-cols-3 gap-4">
								<AddPerson />
							</div>
						</div>
					</div>
				{:else}
					<div class="flex flex-col justify-center gap-4">
						<div class="flex flex-col justify-center gap-4">
							<div class="grid grid-cols-5 gap-4">
								{#each personnel as person}
									<Person {person} />
								{/each}
								<AddPerson />
							</div>
						</div>
					</div>
				{/if}
			{/await}
		</div>
	</div>
	<h2 class="px-4 text-3xl font-bold">Network</h2>
	<div class="flex flex-col w-full gap-4">
		<NetworkDevices />
		<GraphCard chartId={'Network Traffic'} options={netOptions} />
	</div>
</div>
