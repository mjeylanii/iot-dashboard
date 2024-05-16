<script lang="ts">
	import { onMount } from 'svelte';

	import type { AuthSystemFields, TypedPocketBase, UsersRecord } from '$lib/types/pocketbase.type';
	import type { PocketbaseSettings } from '$types';
	import type PocketBaseType from 'pocketbase';

	import { PersonsAPI } from '$api';
	import { StorageHelper } from '$helpers';
	import { alerts } from '$stores';
	import PocketBase from 'pocketbase';

	let personsAPI: PersonsAPI;

	onMount(async () => {
		let storageHelper = new StorageHelper();
		let db_config: PocketbaseSettings = await storageHelper.getPocketbase();
		let pocketbase: PocketBaseType = new PocketBase(
			`http://${db_config.host}:${db_config.port}`,
		) as TypedPocketBase;
		personsAPI = new PersonsAPI(pocketbase);
	});

	const formData = new FormData();

	let date = new Date();

	const data: UsersRecord & AuthSystemFields = {
		name: '',
		email: '',
		avatar: '',
		online: false,
		tasks: [],
	};

	let errors = {
		name: '',
		email: '',
		profile_image: '',
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
	}
	function addPerson() {
		validate();

		if (errors.name == '' && errors.email == '') {
			let formData = new FormData();
			formData.append('name', data.name);
			formData.append('email', data.email);
			formData.append('avatar', data.avatar);

			personsAPI.createPerson(formData);

			const modalToggle: HTMLInputElement = document.getElementById(
				'add-person-modal',
			) as HTMLInputElement;
			modalToggle.checked = false;
			data.name = '';
			data.email = '';
			data.profile_image = null;

			alerts.update((alerts: any) => [
				...alerts,
				{ id: alerts.length++, type: 'success', message: 'Person added successfully' },
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
					{#if data.profile_image == null}
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
