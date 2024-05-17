<script lang="ts">
	import { onMount } from 'svelte';

	import type { TypedPocketBase } from '$lib/types/pocketbase.type';
	import type { PocketbaseSettings } from '$types';
	import type PocketBaseType from 'pocketbase';

	import { AuthAPI } from '$api';
	import { StorageHelper } from '$helpers';
	import LoginForm from '$lib/components/auth/LoginForm.svelte';
	import PasswordResetForm from '$lib/components/auth/PasswordResetForm.svelte';
	import PocketBase from 'pocketbase';

	import { invoke } from '@tauri-apps/api/core';

	let email = '';
	let password = '';
	let resettingPassword = false;
	let resetSent = false;
	let loggingIn = false;

	let authAPI: AuthAPI;

	onMount(async () => {
		let pocketbase: PocketBaseType = new PocketBase('http://localhost:3030');
		let storageHelper = new StorageHelper();
		storageHelper.storeInit();
		let db_config: PocketbaseSettings = await storageHelper.getPocketbase();
		pocketbase = new PocketBase(`http://${db_config.host}:${db_config.port}`) as TypedPocketBase;
		authAPI = new AuthAPI(pocketbase);
		await invoke('close_splashscreen');
	});

	let errors: any = {};

	const validateForm = () => {
		let valid = true;
		if (email == '') {
			errors.email = 'Please enter an email address.';
			valid = false;
		}
		if (password == '') {
			errors.password = 'Please enter a password.';
			valid = false;
		}

		return valid;
	};

	const handleSubmit = async () => {
		invoke('close_login');

		if (validateForm() == false) {
			return;
		}

		loggingIn = true;
		errors.email = '';
		errors.password = '';
		errors.login = '';
		invoke('close_login');
		await authAPI
			.logIn(email, password)
			.then((result) => {
				console.log(result);
				invoke('close_login');
			})
			.catch((error) => {
				loggingIn = false;
				console.log(error);
				errors.login = error.message;
			});
	};

	const handleReset = async () => {
		if (email == '') {
			errors.email = 'Please enter an email address.';
			return;
		}
		resettingPassword = false;
		errors.email = '';
		errors.password = '';
		errors.login = '';

		await authAPI
			.resetPassword(email)
			.then((result) => {
				console.log(result);
				if (result) {
					resetSent = true;
				} else {
					errors.login = 'Failed to login. Please try again.';
				}
			})
			.catch((error) => {
				console.log(error);
				errors.login = error.message;
			});
	};
</script>

{#if resettingPassword}
	<PasswordResetForm bind:email bind:resettingPassword bind:errors on:submit={handleReset} />
{:else}
	<LoginForm
		bind:email
		bind:password
		on:submit={handleSubmit}
		bind:resettingPassword
		bind:errors
		bind:loggingIn
	/>
	{#if resetSent}
		<p class="text-center text-md text-gray-500">
			An email has been sent to {email} with instructions on how to reset your password.
		</p>
	{/if}
{/if}
