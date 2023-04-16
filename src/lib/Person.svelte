<script lang="ts">
	export let person = {
		name: 'John Doe',
		status: 'online'
	};
	import { onMount } from 'svelte';
	import AddPerson from './AddPerson.svelte';
</script>

{#if person.status == 'online'}
	<div class="flex flex-col text-center">
		<div class="avatar online">
			<div class="w-24 rounded-full">
				<img src={'https://picsum.photos/200'} alt={person.name} />
			</div>
		</div>
		<h1 class="text-lg font-bold">{person.name}</h1>
	</div>
{:else}
	<div class="flex flex-col text-center">
		<div class="avatar offline">
			<div class="w-24 rounded-full">
				<img src={'https://picsum.photos/200'} alt={person.name} />
			</div>
			<!-- Name -->
		</div>
		<h1 class="text-lg font-bold">{person.name}</h1>
	</div>
{/if}


