<script>
	import loading from '$lib/messages/loading.js';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { storeInit, getMQTT } from '$lib/helpers/storageHelper';

	let val = 0;
	let interval = setInterval(() => {
		val = val + 1;
		if (val >= 100) {
			clearInterval(interval);
		}
	}, 100);
	$: currentMessage = loading[Math.floor(val / 12.5)];
</script>

<div data-tauri-drag-region class="w-[100vw] h-[100vh] bg-base-200 rounded-lg shadow-2xl">
	<div class="flex absolute w-36 h-36 right-0">
		<div class="bg-repeat w-full h-full heropattern-circuitboard-gray-400" />
	</div>

	<div class="flex absolute w-36 h-36 bottom-0">
		<div class="bg-repeat w-full h-full heropattern-circuitboard-gray-400" />
	</div>

	<div class="flex flex-col items-center justify-center w-full h-full gap-8">
		<div class="block-wrapper">
			<div class="rotate-block" />
		</div>
		<p class="text-center select-none">
			{currentMessage}
			<span class="dots">...</span>
		</p>
	</div>
</div>

<style>
	:root {
		--background-color: #e8e5e5;
		--bg-color-load: #cecdcd;
		--bg-color-load-inner: var(--background-color);
		--bg-color-load-alternate: var(--background-color);
		--size: 100px;
		--border-size: 10px;
	}

	.block-wrapper {
		position: relative;
		width: var(--size);
		height: var(--size);
		overflow: hidden;
	}
	.block-wrapper::before {
		content: '';
		z-index: 1;
		position: absolute;
		width: calc(var(--size) - var(--border-size) * 2);
		height: calc(var(--size) - var(--border-size) * 2);
		background: var(--bg-color-load-inner);
		margin: var(--border-size);
	}
	.rotate-block {
		width: calc(var(--size) * 2);
		height: calc(var(--size) * 2);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		position: absolute;
		top: -50%;
		left: -50%;
		background-color: var(--bg-color-load-alternate);
		animation: rotate 2s infinite ease-in-out;
	}
	.rotate-block::before,
	.rotate-block::after {
		content: '';
		background: var(--bg-color-load);
	}
	.rotate-block::after {
		grid-column: 2;
		grid-row: 2;
	}
	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		25% {
			transform: rotate(90deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
