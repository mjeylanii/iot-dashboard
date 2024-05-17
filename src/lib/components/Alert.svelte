<script lang="ts">
	import { alerts } from '$stores';

	export let type = 'info';
	export let id: number;

	function handleClick() {
		alerts.update((alerts: any) => {
			if (alerts.length == 0) return;

			let alert = document.getElementById(id.toString());
			if (alert) {
				alert?.remove();
			}
			return alerts.filter((alert: any) => alert.id !== id);
		});
	}
</script>

{#if type == 'info'}
	<div id={id.toString()} class="shadow-lg alert alert-info h-fit w-fit">
		<div>
			<button on:click={handleClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="flex-shrink-0 w-6 h-6 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
			</button>
			<span>
				<slot />
			</span>
		</div>
	</div>
{:else if type == 'success'}
	<div id={id.toString()} class=" shadow-lg alert alert-success h-fit w-fit">
		<div>
			<button on:click={handleClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="flex-shrink-0 w-6 h-6 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
			</button>

			<span>
				<slot />
			</span>
		</div>
	</div>
{:else if type == 'warning'}
	<div id={'alert' + id.toString()} class="shadow-lg alert alert-warning h-fit w-fit">
		<div>
			<button on:click={handleClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="flex-shrink-0 w-6 h-6 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/></svg
				>
			</button>
			<span>
				<slot />
			</span>
		</div>
	</div>
{:else if type == 'error'}
	<div id={id.toString()} class="transition shadow-lg alert alert-error h-fit w-fit">
		<div>
			<button on:click={handleClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="flex-shrink-0 w-6 h-6 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
			</button>
			<span>
				<slot />
			</span>
		</div>
	</div>
{/if}
