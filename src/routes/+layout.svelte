<script>
	import Navbar from '$lib/Navbar.svelte';
	export const prerender = true;
	export const ssr = false;
	import '../app.css';
</script>

<div class="p-4">
	<Navbar />
	<br />
	<slot />
</div>
