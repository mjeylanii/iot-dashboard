<script lang="ts">
	import { onMount } from 'svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { lights } from '$lib/stores/devices';

	let error = '';
	export let light: any;

	let isChecked = light.state === 'on';
</script>

<div class="w-full h-full checkbox bg-base-200 group">
	<label class="checkbox-wrapper">
		<input
			id={`${light.id}`}
			type="checkbox"
			class="checkbox-input peer/checkbox-input"
			bind:checked={isChecked}
			on:input={() => {
				light.status === 'on' ? 'off' : 'on';
			}}
		/>
		<span
			class="relative flex flex-col items-center justify-around shadow-xl lg:flex-row rounded-xl checkbox-tile peer-checked/checkbox-input:border-success"
			><span
				class="p-4 {light.status == 'on'
					? 'bg-yellow-500'
					: 'bg-gray-300'} rounded-full checkbox-icon w-fit group-hover:scale-125 transition"
			>
				<svg
					class="rounded-ful w-[2.5rem] h-[2.5rem]"
					fill="#343455"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M12,2A7,7,0,0,0,8,14.74V17a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14.74A7,7,0,0,0,12,2ZM9,21a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V20H9Z"
					/></svg
				>
			</span>

			<span class="flex flex-col checkbox-label">
				<span class="font-bold checkbox-title">{light.name}</span>
				<span class="text-sm checkbox-description hidden">
					{light.state == 'on' ? 'On' : 'Off'}</span
				>
			</span>
		</span>
	</label>
</div>

<style>
	.checkbox-input {
		clip: rect(0 0 0 0);
		-webkit-clip-path: inset(100%);
		clip-path: inset(100%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.checkbox-input:checked + .checkbox-tile {
		border-color: rgb(47, 212, 74);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
	}

	.checkbox-input:checked + .checkbox-tile:before {
		transform: scale(1);
		opacity: 1;
		background-color: rgb(47, 212, 74);
		border-color: rgb(47, 212, 74);
	}

	.checkbox-input:checked + .checkbox-tile .checkbox-icon,
	* .checkbox-input:focus + .checkbox-tile:before {
		transform: scale(1);
		opacity: 1;
	}

	.checkbox-tile {
		min-width: 7rem;
		min-height: 7rem;
		transition: 0.15s ease;
		cursor: pointer;
		position: relative;
	}

	.checkbox-label {
		transition: 0.375s ease;
	}
</style>
