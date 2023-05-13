<script lang="ts">
	import { onMount } from 'svelte';
	import { netOptions } from '$lib/chart_options/networkTraffic';
	import { invoke } from '@tauri-apps/api/tauri';
	import { pocketbase } from '$lib/utils/pocketbase';
	import { alerts } from '$lib/stores/store';
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

	let persons: any = [];

	onMount(async () => {
		let db = pocketbase;
		db.admins
			.authWithPassword('mohamed@localhost.com', 'Wfax2kz333')
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length + 1,
						type: 'error',
						message: 'Something went wrong while authenticating with the database',
						time: new Date()
					}
				]);
			});
		persons = await db
			.collection('personnel')
			.getFullList()
			.then((res) => {
				console.log(res);
				//Return online and name
				return res.map((person: any) => {
					return {
						name: person.name,
						status: person.online
					};
				});
			})
			.catch((err) => {
				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length + 1,
						type: 'error',
						message: 'Something went wrong while fetching database data',
						time: new Date()
					}
				]);
			});
		invoke('close_splashscreen');
	});

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
	<!-- Wearther -->
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

	<div class="text-xl font-medium divider">Lights</div>
	<div class="relative flex flex-col justify-center gap-4">
		<Lights
			light={{
				name: 'Living Room',
				status: 'on',
				brightness: 50,
				color: '#ff0000'
			}}
		/>
	</div>

	<ChartsWrapper />

	<div class="flex flex-col justify-center gap-8 mx-auto lg:w-full">
		<div class="divider">
			<h2 class="text-2xl font-medium">People</h2>
		</div>
		<div class="flex flex-row justify-center gap-8 mx-auto lg:w-full">
			{#await persons then persons}
				{#each persons as person}
					<Person {person} />
				{/each}
			{/await}
			<AddPerson />
		</div>
	</div>
	<h2 class="px-4 text-3xl font-bold">Network</h2>
	<div class="flex flex-col w-full gap-4">
		<NetworkDevices />
		<GraphCard chartId={'Network Traffic'} options={netOptions} />
	</div>
</div>