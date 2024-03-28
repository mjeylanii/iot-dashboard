<script lang="ts">
	import { onMount } from 'svelte';

	import { EditPersonModal } from '$components';

	export let person: any = null;
	onMount(async () => {
		console.log(person);
	});
</script>

<EditPersonModal {person} />
{#if person.status == true}
	<div class="flex flex-col gap-2 text-center">
		<div class="avatar online">
			<div class="w-24 rounded-full">
				<img src={person.profile_image} alt={person.name} />
			</div>
		</div>
		<label class="cursor-pointer" for={'edit-person-modal' + person.id}>
			<h1 class="text-xs font-bold">{person.name}</h1>
		</label>
	</div>
{:else}
	<div class="flex flex-col gap-2 text-center">
		<div class="avatar offline">
			<div class="w-24 rounded-full">
				<img src={person.profile_image} alt={person.name} />
			</div>
		</div>

		<label class="cursor-pointer" for={'edit-person-modal' + person.id}>
			<h1 class="text-xs font-bold">{person.name}</h1>
		</label>
	</div>
{/if}
