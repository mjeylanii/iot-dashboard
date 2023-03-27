<script>
	import Navbar from '$lib/Navbar.svelte';
	import '../app.css';
</script>

<div class="p-4">
	<Navbar />
	<div class="divider" />
	<slot />
</div>
