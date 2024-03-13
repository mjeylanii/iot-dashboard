<script lang="ts">
	import { onMount } from 'svelte';
	import { getWebSocket } from '$lib/helpers/storageHelper';
	let serverAddress = '';
	let serverPort: number;
	let serverUsername = '';
	let serverPassword = '';
	let serverProtocol = '';
	let serverPath = '';
	let topics: any;
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

	
</script>

<div class="form-control w-full max-w-md mx-auto tab-content items-center">
	<label class="label" for="server-address">
		<span class="label-text">Server address</span>
	</label>
	<input
		type="text"
		placeholder="127.0.0.1"
		class="input input-bordered w-full max-w-xs"
		id="server-address"
		value={serverAddress}
	/>

	<label class="label" for="server-port">
		<span class="label-text">Server port</span>
	</label>
	<input
		type="text"
		placeholder="8080"
		class="input input-bordered w-full max-w-xs"
		id="server-port"
		value={serverPort}
	/>

	<label class="label" for="server-username">
		<span class="label-text">Server username</span>
	</label>
	<input
		type="text"
		placeholder="admin"
		class="input input-bordered w-full max-w-xs"
		id="server-username"
		value={serverUsername}
	/>

	<label class="label" for="server-password">
		<span class="label-text">Server password</span>
	</label>
	<input
		type="password"
		placeholder="password"
		class="input input-bordered w-full max-w-xs"
		id="server-password"
		value={serverPassword}
	/>

	<label class="label" for="server-protocol">
		<span class="label-text">Server protocol</span>
	</label>
	<select class="select select-bordered w-full max-w-xs" id="server-protocol">
		<option value="ws">ws</option>
		<option value="wss">wss</option>
	</select>

	<label class="label" for="server-path">
		<span class="label-text">Server path</span>
	</label>
	<input
		type="text"
		placeholder="/socket.io"
		class="input input-bordered w-full max-w-xs"
		id="server-path"
		value={serverPath}
	/>
	<br />
	<div class=" overflow-x-auto">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>Name</th>
					<th>Path</th>
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
			</tbody>
			<tfoot>
				<th colspan="4">
					<button class="w-full btn btn-md">Add Device</button>
				</th>
			</tfoot>
		</table>
	</div>
</div>
