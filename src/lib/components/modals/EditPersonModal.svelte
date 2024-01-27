<script lang="ts">
	import { updatePersonnel } from '$lib/api/PersonsAPI';
	import { alerts } from '$lib/stores/store';

	export let person: any;

	let nameInputEnabled = false;
	let emailInputEnabled = false;
	const data = {
		name: person.name,
		email: person.email,
		profile_image: null
	};
	function Save() {
		updatePersonnel(person.id, data);

		alerts.update((alerts) => [
			...alerts,
			{ id: alerts.length++, type: 'success', message: 'Person updated successfully' }
		]);
		const modal = document.getElementById('edit-person-modal' + person.id);

		modal.checked = false;
	}
	function enableInput(id: string) {
		if (id == 'name') {
			nameInputEnabled = true;
		} else if (id == 'email') {
			emailInputEnabled = true;
		}
	}
</script>

<input type="checkbox" id={'edit-person-modal' + person.id} class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label
			for={'edit-person-modal' + person.id}
			class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
		>
		<!-- Add person -->
		<h3 class="text-lg font-bold">Add person</h3>
		<br />
		<div class="flex flex-row gap-4 text-center">
			<div class="avatar">
				<div class="w-24 rounded-full">
					<img src={person.profile_image} alt="profile" />
				</div>
			</div>
			<div class="form-control my-auto">
				<!-- <label class="label" for="person-image">
					<span class="label-text">Profile image</span>
				</label> -->
				<input bind:files={data.profile_image} type="file" class="file-input w-full max-w-xs" />
			</div>
		</div>
		<br />

		<div class="form-control">
			<label class="label" for="person-name">
				<span class="label-text">Name</span>
				<button
					class="btn btn-sm btn-circle btn-ghost"
					on:click={() => {
						enableInput('name');
					}}
					><img
						src="https://img.icons8.com/material/50/000000/pencil.png"
						alt="Edit icon"
						class="w-8"
					/></button
				>
			</label>

			<input
				id="person-name"
				type="text"
				placeholder={person.name}
				class="input input-bordered"
				bind:value={data.name}
				disabled={!nameInputEnabled}
				required
			/>
			<label class="label" for="person-email">
				<span class="label-text">Email</span>
				<!-- Edit icon -->
				<button
					class="btn btn-sm btn-circle btn-ghost"
					on:click={() => {
						enableInput('email');
					}}
				>
					<img
						src="https://img.icons8.com/material/50/000000/pencil.png"
						alt="Edit icon"
						class="w-8"
					/>
				</button>
			</label>
			<input
				id="person-email"
				placeholder={person.email}
				class="input input-bordered"
				bind:value={data.email}
				required
				disabled={!emailInputEnabled}
			/>

			<br />
			<button
				on:click={() => {
					Save();
				}}
				class="btn btn-primary">Update</button
			>
		</div>
	</div>
</div>
