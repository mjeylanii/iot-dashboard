<script lang="ts">
	import { onMount } from 'svelte';

	import { AuthAPI, PesronsAPI } from '$api';
	import {
		AddPerson,
		ChartsWrapper,
		InfoModal,
		NetworkDevices,
		Person,
		SettingsModal,
		WeatherCard,
	} from '$components';
	import { StorageHelper } from '$helpers';
	import { netOptions } from '$lib/chart_options/networkTraffic';
	import Controls from '$lib/components/Controls.svelte';
	import GraphCard from '$lib/components/graphs/GraphCard.svelte';
	import { alerts, user } from '$stores';

	import { invoke } from '@tauri-apps/api/tauri';

	let personnel: any = [];
	let users: any = [];

	onMount(async () => {
		StorageHelper.storeInit();

		let loggedIn = await checkIfLoggedIn();
		if (!loggedIn) {
			return;
		}
		try {
			await fetchUsersData().then((res) => {
				users = res;
			});
		} catch (err: any) {
			alerts.update((alerts) => [
				...alerts,
				{
					id: alerts.length + 1,
					type: 'error',
					message: err.message,
					time: new Date(),
				},
			]);
			console.log(users);
		}
		try {
			await fetchPersonnelData().then((res) => {
				personnel = res;
			});
			console.log(personnel);
		} catch (err: any) {
			alerts.update((alerts) => [
				...alerts,
				{
					id: alerts.length + 1,
					type: 'error',
					message: err.message,
					time: new Date(),
				},
			]);
		}
	});

	setInterval(async () => {
		if (checkOnline()) {
			try {
				await fetchPersonnelData().then((res) => {
					personnel = res;
				});
			} catch (err: any) {
				alerts.update((alerts) => [
					...alerts,
					{
						id: alerts.length + 1,
						type: 'error',
						message: err.message,
						time: new Date(),
					},
				]);
			}
		}
	}, 5000);
</script>

<SettingsModal />
<InfoModal />
<div class="flex flex-col gap-12">
	<div class="flex flex-col justify-center gap-4">
		<WeatherCard />
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
		<GraphCard data={'0'} chartId={'Network Traffic'} options={netOptions} />
	</div>
</div>
