<script lang="ts">
	import { authenticateWithDatabase, resetPassword } from '$lib/api/AuthAPI';
	import { Alert } from '$components';
	import LoginForm from '$lib/components/auth/LoginForm.svelte';
	import PasswordResetForm from '$lib/components/auth/PasswordResetForm.svelte';
	import { alerts } from '$lib/stores/store';
	import { invoke } from '@tauri-apps/api/tauri';
	import { onMount } from 'svelte';
	import { storeInit, getMQTT } from '$lib/helpers/storageHelper';
	//import { get, init, set, save } from '$lib/helpers/storageHelper';

	let email = '';
	let password = '';
	let resettingPassword = false;
	let resetSent = false;
	let loggingIn = false;

	//Async onmount
	onMount(async () => {
		storeInit();
		invoke('close_splashscreen');
	});

	//Error handling
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
	//Submit handler
	const handleSubmit = async () => {
		invoke('close_login');
		if (validateForm() == false) {
			return;
		}
		//Clear errors
		loggingIn = true;
		errors.email = '';
		errors.password = '';
		errors.login = '';
		invoke('close_login');
		await authenticateWithDatabase(email, password)
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
		//Clear errors
		errors.email = '';
		errors.password = '';
		errors.login = '';

		await resetPassword(email)
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
