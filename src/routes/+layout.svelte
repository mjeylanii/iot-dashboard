<script>

	import Navbar from '$lib/Navbar.svelte';
	export const ssr = false;
	import '../app.css';
</script>

<div class="p-4">
	<Navbar />
	<br />
	<slot />
</div>
