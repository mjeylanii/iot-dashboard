<script lang="ts">
	import { onMount } from 'svelte';

	let showWelcomeCard = true;
</script>

{#if showWelcomeCard}
	<div class="w-1/2 shadow-xl card bg-base-200 mx-auto">
		<div class="card-body">
			<h2 class="card-title">Welcome Back!</h2>
			<p>Welcome back to your dashboard. Here you can see all the latest</p>
			<div class="justify-end card-actions">
				<button
					class="btn btn-primary"
					on:click={() => {
						console.log('Close');
						showWelcomeCard = false;
					}}>Close</button
				>
			</div>
		</div>
	</div>
{/if}
