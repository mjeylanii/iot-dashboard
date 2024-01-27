<script lang="ts">
	import { onMount } from 'svelte';
	import VscChromeClose from 'svelte-icons-pack/vsc/VscChromeClose';
	import VscChromeMaximize from 'svelte-icons-pack/vsc/VscChromeMaximize';
	import VscChromeMinimize from 'svelte-icons-pack/vsc/VscChromeMinimize';
	import VscChromeRestore from 'svelte-icons-pack/vsc/VscChromeRestore';
	import { invoke } from '@tauri-apps/api/tauri';
	//@ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { appWindow } from '@tauri-apps/api/window';
	let isMaximized: boolean;
	export let loc: string;
	onMount(() => {
		appWindow.isMaximized().then((max) => {});
		document.getElementById('titlebar-minimize')?.addEventListener('click', () => {
			appWindow.minimize();
		});
		document.getElementById('titlebar-maximize')?.addEventListener('click', () => {
			appWindow.toggleMaximize();
			isMaximized = !isMaximized;
		});
		document.getElementById('titlebar-close')?.addEventListener('click', () => {
			invoke('close_main');
			appWindow.close();
		});
	});
</script>

<div
	class="fixed top-0 left-0 right-0 z-50 flex justify-between px-2 bg-neutral select-none"
	data-tauri-drag-region
>
	<div class="container flex items-center gap-2 py-2 w-fit h-fit">
		<!-- Dashboard image -->
		<img src="./32x32.png" alt="Dashboard" class="w-6 h-6" />
		<p class="text-sm font-medium normal-case navbar-start text-neutral-content">Dashboard</p>
	</div>
	<div class="flex items-center">
		<div
			class="flex transition border-black titlebar-button hover:border hover:bg-slate-300 hover:text-black text-white"
			id="titlebar-minimize"
		>
			<Icon src={VscChromeMinimize} />
		</div>
		{#if loc != 'login'}
			<div
				class="transition border-black titlebar-button hover:bg-slate-300 hover:border hover:text-black text-white"
				id="titlebar-maximize"
			>
				{#if isMaximized}
					<Icon src={VscChromeRestore} />
				{:else}
					<Icon src={VscChromeMaximize} />
				{/if}
			</div>
		{/if}

		<div
			class="transition border-black titlebar-button hover:bg-error hover:border hover:text-black text-white"
			id="titlebar-close"
		>
			<Icon src={VscChromeClose} />
		</div>
	</div>
</div>

<style>
	.titlebar-button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
	}
</style>
