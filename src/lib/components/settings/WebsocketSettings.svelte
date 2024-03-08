<script lang="ts">
	let serverAddress = '';
	let serverPort = '';
	let serverUsername = '';
	let serverPassword = '';
	let serverProtocol = '';
	let serverPath = '';
	let serverReconnect = '';
	let serverRooms: any[] = [];

	const addRoom = () => {
		serverRooms = [...serverRooms, { name: 'Lights', path: '/room/lights' }];
	};
</script>

<div class="form-control w-full max-w-xs mx-auto tab-content">
	<label class="label" for="server-address">
		<span class="label-text">Server address</span>
	</label>
	<input
		type="text"
		placeholder="127.0.0.1"
		class="input input-bordered w-full max-w-xs"
		id="server-address"
	/>

	<label class="label" for="server-port">
		<span class="label-text">Server port</span>
	</label>
	<input
		type="text"
		placeholder="8080"
		class="input input-bordered w-full max-w-xs"
		id="server-port"
	/>

	<label class="label" for="server-username">
		<span class="label-text">Server username</span>
	</label>
	<input
		type="text"
		placeholder="admin"
		class="input input-bordered w-full max-w-xs"
		id="server-username"
	/>

	<label class="label" for="server-password">
		<span class="label-text">Server password</span>
	</label>
	<input
		type="password"
		placeholder="password"
		class="input input-bordered w-full max-w-xs"
		id="server-password"
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
	/>

	<label class="label" for="server-reconnect">
		<span class="label-text">Server reconnect</span>
	</label>
	<select class="select select-bordered w-full max-w-xs" id="server-reconnect">
		<option value="true">true</option>
		<option value="false">false</option>
	</select>
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
				<!-- row 1 -->
				<tr>
					<th>1</th>
					<td>Lights</td>
					<td> /room/lights </td>
					<td>
						<button class="btn btn-xs btn-primary">Edit</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
