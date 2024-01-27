<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const submit = () => dispatch('submit');
	export let email = '';
	export let resettingPassword: boolean;
	export let errors: any = {};
</script>

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
	<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
		<!-- Enter email -->
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
				Enter your email
			</h1>
			<div class="space-y-4 md:space-y-6">
				<div>
					<label for="email" class=" mb-2 text-sm font-medium text-gray-900 flex gap-4"
						>Your email
						<!-- Error -->
						{#if errors.email}
							<span class=" text-red-500">{errors.email}</span>
						{/if}
					</label>
					<input
						bind:value={email}
						type="email"
						name="email"
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						placeholder="email@example.com"
						required
					/>
				</div>
				<div>
					<button
						on:click={() => submit()}
						type="submit"
						class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>Reset</button
					>
					<br />
					<br />
					<p class="text-sm font-light text-gray-500">
						Remembered your password? <button
							on:click={() => {
								resettingPassword = false;
								errors = {};
							}}
							class="font-medium text-primary-600 hover:underline">Login here</button
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
