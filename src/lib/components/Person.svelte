<script lang="ts">
	import { onMount } from 'svelte';

	export let person: any;
	onMount(async () => {
		console.log(person);
	});
</script>

{#if person.status == true}
	<div class="flex flex-col text-center gap-2">
		<div class="avatar online">
			<div class="w-24 rounded-full">
				<img src={'https://picsum.photos/200'} alt={person.name} />
			</div>
		</div>
		<h1 class="text-xs font-bold">{person.name}</h1>
	</div>
{:else}
	<div class="flex flex-col text-center gap-2">
		<div class="avatar offline">
			<div class="w-24 rounded-full">
				<img src={'https://picsum.photos/200'} alt={person.name} />
			</div>
		</div>
		<h1 class="text-xs font-bold">{person.name}</h1>
	</div>
{/if}
