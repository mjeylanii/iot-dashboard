<script lang="ts">
	export let assignees: string[] = [];
</script>

<div class="flex -space-x-2">
	{#each assignees as assignee}
		<span>
			<img
				class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
				src={`/images/${assignee}.jpg`}
				alt={assignee}
			/>
		</span>
	{/each}
</div>
