<script lang="ts">
	import { onMount } from 'svelte';
	import { getWebSocket } from '$lib/helpers/storageHelper';
	import InputField from './InputField.svelte';
	import SelectField from './SelectField.svelte';
	import { setContext } from 'svelte';

	let serverAddress = '';
	let serverPort: number;
	let serverUsername = '';
	let serverPassword = '';
	let serverProtocol = '';
	let serverPath = '';
	let topics: any;
	let addNewDevice: boolean = false;

	onMount(async () => {
		let data = await getWebSocket();

		if (!data) return;

		serverAddress = data.host;
		serverPort = data.port;
		serverUsername = data.username;
		serverPath = data.path;
		serverProtocol = data.protocol;
		topics = data.topics;
	});

	const handleInputChange = (event: Event) => {
		const { id, value } = event.target as HTMLInputElement;
		switch (id) {
			case 'server-address':
				serverAddress = value;
				break;
			case 'server-port':
				serverPort = parseInt(value, 10);
				break;
			case 'server-username':
				serverUsername = value;
				break;
			case 'server-password':
				serverPassword = value;
				break;
			case 'server-protocol':
				serverProtocol = value;
				break;
			case 'server-path':
				serverPath = value;
				break;
			default:
				break;
		}
	};
</script>

<div class="flex flex-col w-full tab-content items-center justify-center mx-auto px-16">
	<InputField
		label="Server address"
		id="server-address"
		value={serverAddress}
		onChange={handleInputChange}
	/>
	<InputField
		label="Server port"
		id="server-port"
		value={serverPort}
		onChange={handleInputChange}
	/>
	<InputField
		label="Server username"
		id="server-username"
		value={serverUsername}
		onChange={handleInputChange}
	/>
	<InputField
		label="Server password"
		id="server-password"
		type="password"
		value={serverPassword}
		onChange={handleInputChange}
	/>
	<SelectField
		label="Server protocol"
		id="server-protocol"
		value={serverProtocol}
		onChange={handleInputChange}
		options={[
			{ label: 'ws', value: 'ws' },
			{ label: 'wss', value: 'wss' }
		]}
	/>
	<InputField
		label="Server path"
		id="server-path"
		value={serverPath}
		onChange={handleInputChange}
	/>

	<br />
	<div class=" overflow-x-auto max-w-md px-2">
		<table id="websocket-devices-table" class="table w-full max-w-md">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th class="w-full">Name</th>
					<th class="w-full">Path</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#if topics?.devices}
					{#each topics?.devices as device}
						<tr>
							<td>{device.name}</td>
							<td>{device.topic}</td>
							<td>
								<button class="btn btn-xs btn-accent text-neutral">Edit</button>
							</td>
						</tr>
					{/each}
				{/if}
				{#if addNewDevice}
					<tr>
						<td>
							<input
								type="text"
								placeholder="Device"
								class="input input-xs input-bordered mx-w-xs"
								id="device-name"
							/>
						</td>
						<td>
							<input
								type="text"
								placeholder="/socket.io"
								class="input input-xs input-bordered"
								id="server-path"
							/>
						</td>
						<td>
							<button class="btn btn-xs btn-accent max-w-xs text-base-100">Add</button>
						</td>
					</tr>
				{/if}
			</tbody>
			<tfoot>
				<th class="" colspan="4">
					<button on:click={() => (addNewDevice = !addNewDevice)} class="w-full btn btn-md"
						>Add Device</button
					>
				</th>
			</tfoot>
		</table>
	</div>
</div>
