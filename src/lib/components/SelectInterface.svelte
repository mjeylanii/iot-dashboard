<script lang="ts">
	import type { Interface } from '$types';

	export let interfaces: Interface[] = [];
	export let onChange = (selected: Interface) => {};

	function localOnChange(event: any) {
		const indexStr = event.target.value as string;
		const index = Number(indexStr);
		const selected = interfaces[index];
		onChange(selected);
	}
</script>

<label class="form-control w-full max-w-xs">
	<div class="label">
		<span class="label-text">Select Network Interface</span>
	</div>
	<select on:change={(e) => localOnChange(e)} class="select select-bordered">
		{#each interfaces as i, index}
			<option value={index}>{i.name}</option>
		{/each}
	</select>
</label>
