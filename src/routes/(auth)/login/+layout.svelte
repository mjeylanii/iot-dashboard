<script>
	import '../../../app.css';

	import Titlebar from '$lib/Titlebar.svelte';

	let loc = 'login';
</script>

<Titlebar />
<br />
<div>
	<slot />
</div>
