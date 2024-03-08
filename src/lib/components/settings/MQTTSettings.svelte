<script lang="ts"></script>

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
			</tbody>
		</table>
	</div>
</div>
