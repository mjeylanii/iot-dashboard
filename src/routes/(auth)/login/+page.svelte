<script lang="ts">
	import { onMount } from 'svelte';

	import { authenticateWithDatabase, resetPassword } from '$lib/api/AuthAPI';
	import LoginForm from '$lib/components/auth/LoginForm.svelte';
	import PasswordResetForm from '$lib/components/auth/PasswordResetForm.svelte';

	import { invoke } from '@tauri-apps/api/tauri';

	let email = '';
	let password = '';
	let resettingPassword = false;
	let resetSent = false;
	let loggingIn = false;

	onMount(async () => {
		invoke('close_splashscreen');
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
		invoke("open_")
		invoke('close_login');

		if (validateForm() == false) {
			return;
		}

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
