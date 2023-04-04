<script lang="ts">
	import { onMount } from 'svelte';
	import type { MQTTAPI } from './api/MQTTAPI';
	import { MQTT_CONFIG, LIGHT_TOPICS } from './config';

	export let client: MQTTAPI;
	let lights = [
		{
			id: 1,
			name: 'Light 1',
			state: 'off'
		},
		{
			id: 2,
			name: 'Light 2',
			state: 'off'
		},
		{
			id: 3,
			name: 'Light 3',
			state: 'off'
		},
		{
			id: 4,
			name: 'Light 4',
			state: 'off'
		},
		{
			id: 5,
			name: 'Light 5',
			state: 'off'
		},
		{
			id: 6,
			name: 'Light 6',
			state: 'off'
		}
	];
</script>

<div class="grid items-center justify-center grid-flow-row grid-cols-2 gap-4 lg:grid-cols-4">
	{#each lights as light}
		<div class="w-full h-full checkbox">
			<label class="checkbox-wrapper">
				<input
					id={`checkbox-${light.id}`}
					on:input={() => {
						const newState = light.state === 'on' ? 'off' : 'on';
					}}
					type="checkbox"
					class="checkbox-input"
					checked={light.state === 'on'}
				/>
				<span
					class="relative flex flex-col items-center justify-around shadow-xl lg:flex-row rounded-xl checkbox-tile bg-base-100 hover:border-green-500"
					><span
						class="p-4 {light.state == 'on'
							? 'bg-yellow-400'
							: 'bg-gray-300'} rounded-full checkbox-icon w-fit"
					>
						<svg
							class="rounded-full"
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
						<span class="text-sm checkbox-description"> {light.state == 'on' ? 'On' : 'Off'}</span>
					</span>
				</span>
			</label>
		</div>
	{/each}
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
		color: rgb(47, 212, 74);
	}

	.checkbox-input:checked + .checkbox-tile:before {
		transform: scale(1);
		opacity: 1;
		background-color: rgb(47, 212, 74);
		border-color: rgb(47, 212, 74);
	}

	.checkbox-input:checked + .checkbox-tile .checkbox-icon,
	.checkbox-input:checked + .checkbox-tile .checkbox-label {
		color: rgb(41, 39, 29);
	}

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

	.checkbox-tile:hover:before {
		transform: scale(1);
		opacity: 1;
	}

	/* .checkbox-icon {
		transition: 0.375s ease;
		color: #494949;
	} */

	.checkbox-icon svg {
		width: 2.5rem;
		height: 2.5rem;
	}

	.checkbox-label {
		color: #707070;
		transition: 0.375s ease;
	}
</style>
