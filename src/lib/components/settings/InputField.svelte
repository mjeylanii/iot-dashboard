<script lang="ts">
	export let label: string;
	export let type = 'text';
	export let placeholder = '';
	export let id: string;
	export let value: string | number;
	export let onChange: any;
</script>

<div class="w-full">
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<input
		{type}
		{placeholder}
		class="input input-bordered w-full"
		{id}
		{value}
		on:input={onChange}
	/>
</div>
