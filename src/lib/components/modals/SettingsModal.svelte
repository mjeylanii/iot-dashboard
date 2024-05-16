<script lang="ts">
	import { onMount } from 'svelte';
	import {StorageHelper} from '$helpers';

	import { WebsocketSettings, MQTTSettings } from '$lib/components/settings/';

	let settingsData: any = {};
	let settingsDataKeys: any = [];
	let settingsDataValues: any = [];

	let activeTab = 0;

	function switchTab(index: number) {
		activeTab = index;
	}
	onMount(async () => {
	      let storageHelper = new StorageHelper();


	});
	function saveSettings() {
		switch (activeTab) {
			case 0:
				settingsDataKeys = [
					'server_address',
					'server_port',
					'server_username',
					'server_password',
					'server_protocol',
					'server_path',
					'server_topics'
				];
				settingsDataValues = [
					(<HTMLInputElement>document.getElementById('server-address')).value,
					(<HTMLInputElement>document.getElementById('server-port')).value,
					(<HTMLInputElement>document.getElementById('server-username')).value,
					(<HTMLInputElement>document.getElementById('server-protocol')).value,
					(<HTMLInputElement>document.getElementById('server-path')).value,
					(<HTMLInputElement>document.getElementById('server-topics')).value
				];
				break;
			case 1:
				settingsDataKeys = [
					'mqtt_server_address',
					'mqtt_server_port',
					'mqtt_username',
					'mqtt_password'
				];
				settingsDataValues = [
					(<HTMLInputElement>document.getElementById('mqtt-server-address')).value,
					(<HTMLInputElement>document.getElementById('mqtt-server-port')).value,
					(<HTMLInputElement>document.getElementById('mqtt-username')).value,
					(<HTMLInputElement>document.getElementById('mqtt-password')).value
				];
				break;
			case 2:
				settingsDataKeys = ['dark_mode'];
				settingsDataValues = [(<HTMLInputElement>document.getElementById('dark-mode')).checked];
				break;
			case 3:
				settingsDataKeys = ['name', 'email', 'password'];
				settingsDataValues = [
					(<HTMLInputElement>document.getElementById('name')).value,
					(<HTMLInputElement>document.getElementById('email')).value,
					(<HTMLInputElement>document.getElementById('password')).value
				];
				break;
		}
	}
</script>

<input type="checkbox" id="settings-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative w-[90vw] md:h-[80vh] h-[60vh] mt-10">
		<label for="settings-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Settings</h3>
		<br />
		<div class="tabs ml-16 w-full max-w-sm">
			<button
				class="tab tab-bordered {activeTab === 0 ? 'tab-active transition 	' : ''}"
				on:click={() => switchTab(0)}>WebSocket</button
			>
			<button
				class="tab tab-bordered {activeTab === 1 ? 'tab-active transition ' : ''}"
				on:click={() => switchTab(1)}>MQTT</button
			>
			<button
				class="tab tab-bordered {activeTab === 2 ? 'tab-active transition ' : ''}"
				on:click={() => switchTab(2)}>General</button
			>
			<button
				class="tab tab-bordered {activeTab === 3 ? 'tab-active transition ' : ''}"
				on:click={() => switchTab(3)}>Profile</button
			>
		</div>
		<br />
		{#if activeTab === 0}
			<WebsocketSettings />
		{/if}
		{#if activeTab === 1}<MQTTSettings />{/if}
		{#if activeTab === 2}
			<!-- General -->
		{/if}
		{#if activeTab === 3}
			<!-- Profile -->
		{/if}
		<br />

		<div class=" flex flex-row gap-4 items-center justify-center">
			<button on:click={saveSettings} class="btn btn-md btn-primary">Save</button>
			<label for="settings-modal" class="btn btn-sm btn-ghost">Cancel</label>
		</div>
	</div>
</div>
