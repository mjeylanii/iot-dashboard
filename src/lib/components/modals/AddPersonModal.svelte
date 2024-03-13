<script lang="ts">
	import { addPersonnel } from '$lib/api/PersonsAPI';
	import { alerts } from '$lib/stores/store';
	const formData = new FormData();
	let date = new Date();
	const data = {
		name: '',
		last_present: date.toUTCString(),
		email: '',
		online: false,
		profile_image: null
	};

	let errors = {
		name: '',
		email: '',
		profile_image: ''
	};
	function validate() {
		if (data.name == '') {
			errors.name = 'Name is required';
		} else {
			errors.name = '';
		}
		if (data.email == '') {
			errors.email = 'Email is required';
		} else {
			errors.email = '';
		}
		// if (data.profile_image != null && data.profile_image.size > 1000000) {
		// 	errors.profile_image = 'File size must be less than 1MB';
		// } else {
		// 	errors.profile_image = '';
		// }
	}
	function addPerson() {
		validate();

		if (errors.name == '' && errors.email == '') {
			addPersonnel(data);

			const modal = document.getElementById('add-person-modal');
			modal.checked = false;
			data.name = '';
			data.email = '';
			data.profile_image = null;

			alerts.update((alerts: any) => [
				...alerts,
				{ id: alerts.length++, type: 'success', message: 'Person added successfully' }
			]);
		}
	}
</script>

<input type="checkbox" id="add-person-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label for="add-person-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Add person</h3>
		<br />
		<div class="flex flex-row gap-4 text-center">
			<div class="avatar">
				<div class="w-24 rounded-full">
					{#if data.profile_image == null}{:else}
						<img
							src={data.profile_image ? URL.createObjectURL(new Blob(data.profile_image)) : ''}
							alt="profile"
						/>
					{/if}
				</div>
			</div>
			<div class="form-control my-auto">
				<input
					id="fileInput"
					bind:files={data.profile_image}
					type="file"
					class="file-input w-full max-w-xs"
					accept="image/*"
				/>
				{#if errors.profile_image != ''}
					<span class="text-error">{errors.profile_image}</span>
				{/if}
				{#if data.profile_image != null}
					{#if data.profile_image.size > 1000000}
						<span class="text-error">File size must be less than 1MB</span>
					{/if}
				{/if}
			</div>
		</div>
		<br />

		<div class="form-control">
			<label class="label" for="person-name">
				<span class="label-text">Name</span>
				{#if errors.name != ''}
					<span class="text-error">{errors.name}</span>
				{/if}
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
				{#if errors.email != ''}
					<span class="text-error">{errors.email}</span>
				{/if}
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
