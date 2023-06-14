<script lang="ts">
	import { addPersonnel } from '$lib/api/PersonsAPI';
	const data = {
		name: '',
		last_present: new Date(),
		email: '',
		online: false
	};
	function addPerson() {
		addPersonnel(data);
	}
</script>

<input type="checkbox" id="add-person-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label for="add-person-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<!-- Add person -->
		<h3 class="text-lg font-bold">Add person</h3>
		<br />
		<div class="flex flex-row gap-4 text-center">
			<div class="avatar">
				<div class="w-24 rounded-full">
					<img src={'https://picsum.photos/200'} alt="profile" />
				</div>
			</div>
			<div class="form-control my-auto">
				<!-- <label class="label" for="person-image">
					<span class="label-text">Profile image</span>
				</label> -->
				<input type="file" class="file-input w-full max-w-xs" />
			</div>
		</div>
		<br />

		<div class="form-control">
			<label class="label" for="person-name">
				<span class="label-text">Name</span>
			</label>
			<input
				id="person-name"
				type="text"
				placeholder="John Doe"
				class="input input-bordered"
				bind:value={data.name}
				required
			/>
			<label class="label" for="person-email">
				<span class="label-text">Email</span>
			</label>
			<input
				id="person-email"
				type="text"
				placeholder=""
				class="input input-bordered"
				bind:value={data.email}
				required
			/>

			<br />
			<button
				on:click={() => {
					addPerson();
				}}
				class="btn btn-primary">Save</button
			>
		</div>
	</div>
</div>
