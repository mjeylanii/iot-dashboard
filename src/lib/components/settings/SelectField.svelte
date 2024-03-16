<script lang="ts">
	export let label: string;
	export let id: string;
	export let value: string | number;
	export let onChange: any;
	export let options: any;
</script>

<div>
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<select class="select select-bordered w-full max-w-xs" {id} bind:value>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
