<script>
	export let interfaces = [];
	export let onChange = () => {};

	function localOnChange(event: any) {
		const indexStr = event.target.value as string;
		const index = Number(indexStr);
		const selected = interfaces[index];
		onChange(selected);
	}
</script>

<label className="form-control w-full max-w-xs">
	<div className="label">
		<span className="label-text">Select Network Interface</span>
	</div>
	<select onChange={(e) => localOnChange(e)} className="select select-bordered">
		{#each interfaces as i, index}
			<option key={i.index} value={index}>{i.name}</option>
		{/each}
	</select>
</label>
