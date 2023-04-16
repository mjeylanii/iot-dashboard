<script lang="ts">
	let activeTab = 0;

	function switchTab(index: number) {
		activeTab = index;
	}
</script>

<input type="checkbox" id="settings-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative mx-w-xl">
		<label for="settings-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Settings</h3>
		<br />
		<div class="tabs ml-16 w-full max-w-sm">
			<button
				class="tab tab-bordered {activeTab === 0 ? 'tab-active transition-x-52 	' : ''}"
				on:click={() => switchTab(0)}>WebSocket</button
			>
			<button
				class="tab tab-bordered {activeTab === 1 ? 'tab-active transition-x-10' : ''}"
				on:click={() => switchTab(1)}>MQTT</button
			>
			<button
				class="tab tab-bordered {activeTab === 2 ? 'tab-active transition-x-10' : ''}"
				on:click={() => switchTab(2)}>General</button
			>
			<button
				class="tab tab-bordered {activeTab === 3 ? 'tab-active transition-x-10' : ''}"
				on:click={() => switchTab(3)}>Profile</button
			>
		</div>
		<br />
		{#if activeTab === 0}
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
			</div>
		{/if}
		{#if activeTab === 1}
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
							<!-- row 1 -->
							<tr>
								<th>1</th>
								<td>Lights</td>
								<td> /room/lights </td>
								<td>
									<button class="btn btn-sm btn-primary">Edit</button>
								</td>
							</tr>
							<!-- row 2 -->
							<tr class="hover">
								<th>2</th>
								<td>Temperature</td>
								<td> /room/temperature </td>
								<td>
									<button class="btn btn-sm btn-primary">Edit</button>
								</td>
							</tr>
							<!-- row 3 -->
							<tr>
								<th>3</th>
								<td>Camera</td>
								<td> /room/camera </td>
								<td>
									<button class="btn btn-sm btn-primary">Edit</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		{/if}
		{#if activeTab === 2}
			<!-- General -->
		{/if}
		{#if activeTab === 3}
			<!-- Profile -->
		{/if}
		<br />

		<div class="form-control max-w-sm flex flex-row ml-auto gap-4">
			<button class="btn btn-primary">Save</button>
			<button class="btn btn-ghost">Cancel</button>
		</div>
	</div>
</div>
