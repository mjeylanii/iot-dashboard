<script lang="ts">
	import { onMount } from 'svelte';
	import { devices } from '$lib/stores/store';


	export let service: any;
	export let light: any;

	let isChecked = light.status === 'on';

	function toggle() {
		isChecked = !isChecked;
		service.service.sendLightCommand(isChecked ? 'on' : 'off', light.id, light.name);
	}
</script>

<div class="w-full h-full checkbox bg-base-200 group">
	<label class="checkbox-wrapper">
		<input
			id={`${light.id}`}
			type="checkbox"
			class="checkbox-input peer/checkbox-input"
			bind:checked={isChecked}
			on:input={() => {
				toggle();
			}}
		/>
		<span
			class="relative flex flex-col items-center justify-around shadow-xl lg:flex-row rounded-xl checkbox-tile peer-checked/checkbox-input:border-success gap-3 p-2"
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

			<span class="flex flex-col checkbox-label w-2/3">
				<span class="font-bold checkbox-title tracking-tight">{light.name}</span>
				<br />
				{#if light.status == ''}
					<span class="text-sm text-error flex">
						<svg
							fill="#f70808"
							viewBox="0 0 1024 1024"
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4 mr-1"
							><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><g id="SVGRepo_iconCarrier">
								<path
									d="M832.6 191.4c-84.6-84.6-221.5-84.6-306 0l-96.9 96.9 51 51 96.9-96.9c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204l-96.9 96.9 51.1 51.1 96.9-96.9c84.4-84.6 84.4-221.5-.1-306.1zM446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l96.9-96.9-51.1-51.1-96.9 96.9c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l96.9-96.9-51-51-96.8 97zM260.3 209.4a8.03 8.03 0 0 0-11.3 0L209.4 249a8.03 8.03 0 0 0 0 11.3l554.4 554.4c3.1 3.1 8.2 3.1 11.3 0l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3L260.3 209.4z"
								/>
							</g></svg
						>Disconnected
					</span>
				{/if}
				<span class="text-sm checkbox-description hidden">
					{light.status == 'on' ? 'On' : 'Off'}</span
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
