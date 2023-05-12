<script>
	// Import messages array and assign it to a state variable
	import messages from '$lib/messages.js';
	let val = 0;
	let interval = setInterval(() => {
		val = val + 1;
		if (val >= 100) {
			clearInterval(interval);
		}
	}, 100);
	$: currentMessage = messages[Math.floor(val / 12.5)];
</script>

<div data-tauri-drag-region class="w-[100vw] h-[100vh] bg-base-300 rounded-lg shadow-2xl">
	<div class="flex flex-col items-center justify-center w-full h-full gap-8">
		<h1 class="text-2xl text-center">Setting up OfficeHub</h1>
		<div class="radial-progress" style="--value:{val}; --size:8rem; --thickness: 2px;">{val}%</div>
		<span class="loading sr-only" />
		<p class="text-center">
			{currentMessage}
			{#if val !== 100}
				<span class="dots">{'. '.repeat(val % 4)}</span>
			{/if}
		</p>
	</div>
</div>

<style>
	/* Use a more flexible animation */
	.dots {
		display: inline-block;
		width: 1ch;
		animation: blink 1s steps(5) infinite;
	}
	@keyframes blink {
		to {
			visibility: hidden;
		}
	}
</style>
