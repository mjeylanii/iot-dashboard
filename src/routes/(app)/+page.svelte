<script lang="ts">
	import { onMount } from 'svelte';

	import type { TypedPocketBase } from '$lib/types/pocketbase.type';
	import type { PocketbaseSettings } from '$types';

	import { AuthAPI, PersonsAPI } from '$api';
	import {
		AddPerson,
		ChartsWrapper,
		Content,
		Controls,
		InfoModal,
		MessageCard,
		MyTasks,
		NetworkDevices,
		Person,
		Project,
		SettingsModal,
		WeatherCard,
	} from '$components';
	import { StorageHelper } from '$helpers';
	import GraphCard from '$lib/components/graphs/GraphCard.svelte';
	import { chartOptionsGenerator } from '$lib/utils';
	import { alerts, showUserPage, users } from '$stores';
	import PocketBase from 'pocketbase';

	onMount(async () => {
		const storageHelper = new StorageHelper();
		storageHelper.storeInit();
		let db_config: PocketbaseSettings = await storageHelper.getPocketbase();
		let pocketbase: PocketBase = new PocketBase(
			`http://${db_config.host}:${db_config.port}`,
		) as TypedPocketBase;

		const authAPI = new AuthAPI(pocketbase);
		const personsAPI = new PersonsAPI(pocketbase);

		if (!authAPI.checkIfLoggedIn()) {
			return;
		}

		try {
			await personsAPI.getPersons().then((res) => {
				users.set(res);
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
	});
	showUserPage.subscribe((value) => {
		if (value) {
			console.log('User Page');
			document.title = 'User Page';
		} else {
			console.log('Dashboard');
			document.title = 'Dashboard';
		}
	});
</script>

<SettingsModal />
<InfoModal />
<div class="flex flex-col gap-12">
	<div class="flex flex-col justify-center gap-4">
		<WeatherCard />
	</div>
	{#if $showUserPage}
		<Content>
			<MessageCard />
			<MyTasks />
			<Project />
		</Content>
	{:else}
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
				{#if $users == undefined || $users.length == 0}
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
								{#each $users as user}
									<Person {user} />
								{/each}
								<AddPerson />
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<h2 class="px-4 text-3xl font-bold">Network</h2>
		<div class="flex flex-col w-full gap-4">
			<NetworkDevices />
			<GraphCard data={'0'} chartId={'Network Traffic'} options={chartOptionsGenerator('net')} />
		</div>
	{/if}
</div>
