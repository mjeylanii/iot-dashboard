<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Titlebar from '$lib/Titlebar.svelte';
	import { Svrollbar } from 'svrollbar';
	import '../app.css';
	import { onMount } from 'svelte';
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

<div class="max-w-screen-lg mx-auto overflow-y-auto py-28 content-wrapper h-fit">
	<slot />
</div>
