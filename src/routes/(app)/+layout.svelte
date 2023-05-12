<script lang="ts">
	import Titlebar from '$lib/Titlebar.svelte';
	import { Svrollbar } from 'svrollbar';
	import '../../app.css';
	import { onMount } from 'svelte';
	import { Alert, Navbar } from '$components';
	import { alerts } from '$lib/stores/store.js';
	let viewport: Element | undefined;
	onMount(() => {
		//get content wrapper by class
		viewport = document.querySelector('.content-wrapper') as Element;
	});

	//Content
</script>

<Titlebar />

<Navbar />
<Svrollbar />
<div class="z-50 toast toast-end">
	{#each $alerts as alert}
		<Alert id={alert.id} type={alert.type}>{alert.message}</Alert>
	{/each}
</div>
<div class="max-w-screen-lg mx-auto overflow-y-auto py-28 content-wrapper h-fit">
	<slot />
</div>
