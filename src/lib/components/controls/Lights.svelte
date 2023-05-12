<script lang="ts">
	import { onMount } from 'svelte';
	import { mqtt } from '$lib/stores/store.js';
	import { getLights, getLightStates } from '$lib/api/LightsAPI';
	import Alert from '$lib/components/Alert.svelte';
	let error = '';

	export let light: any;
</script>

<div
	class="grid items-center justify-center grid-flow-row grid-cols-2 gap-4 lg:grid-cols-4 select-none"
>
	<div class="w-full h-full checkbox bg-base-200 group">
		<label class="checkbox-wrapper">
			<input
				id={`checkbox-${light.id}`}
				type="checkbox"
				class="checkbox-input peer/checkbox-input"
				checked={light.state === 'on'}
				on:input={() => {
					light.state = light.state === 'on' ? 'off' : 'on';
				}}
			/>
			<span
				class="relative flex flex-col items-center justify-around shadow-xl lg:flex-row rounded-xl checkbox-tile peer-checked/checkbox-input:border-success"
				><span
					class="p-4 {light.state == 'on'
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
					<span class="font-bold checkbox-title">Light {light.id}</span>
					<span class="text-sm checkbox-description hidden">
						{light.state == 'on' ? 'On' : 'Off'}</span
					>
				</span>
			</span>
		</label>
	</div>
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
	/* .checkbox-input:checked + .checkbox-tile .checkbox-label {
		color: rgb(41, 39, 29);
	} */

	/* Tile focus border */
	/* .checkbox-input:focus + .checkbox-tile {
		border-color: rgb(47, 212, 74);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px rgb(47, 212, 74);
	} */
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

	/* .checkbox-tile:before {
		content: '';
		position: absolute;
		display: block;
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid #b5bfd9;
		background-color: #fff;
		border-radius: 50%;
		top: 0.25rem;
		left: 0.25rem;
		opacity: 0;
		transform: scale(0);
		transition: 0.25s ease;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
		background-size: 12px;
		background-repeat: no-repeat;
		background-position: 50% 50%;
	} */
	/* 
	.checkbox-tile:hover:before {
		transform: scale(1);
		opacity: 1;
	} */

	/* .checkbox-icon {
		transition: 0.375s ease;
		color: #494949;
	} */

	/* .checkbox-icon svg {
		width: 2.5rem;
		height: 2.5rem;
	} */

	.checkbox-label {
		transition: 0.375s ease;
	}
</style>
