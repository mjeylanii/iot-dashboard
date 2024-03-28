<script lang="ts">
	import Titlebar from '$lib/Titlebar.svelte';
	import { Svrollbar } from 'svrollbar';

	import '../../app.css';

	import { Alert, Navbar } from '$components';
	import { alerts } from '$stores';

	let loc = 'app';
</script>

<Titlebar {loc} />
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
