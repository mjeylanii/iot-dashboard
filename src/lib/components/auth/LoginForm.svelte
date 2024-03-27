<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let email = '';
	export let password = '';
	export let resettingPassword = false;
	export let errors: any = {};
	export let loggingIn: boolean = false;
	const dispatch = createEventDispatcher();
	const submit = () => dispatch('submit');
</script>

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
	<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
				Sign in to your account
			</h1>
			<div class="space-y-4 md:space-y-6">
				<div>
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900"
						>Your email
						{#if errors.email}
							<span class="text-red-500">{'*' + errors.email}</span>
						{/if}
					</label>
					<input
						bind:value={email}
						type="email"
						name="email"
						id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						placeholder="name@company.com"
						required
					/>
				</div>
				<div>
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
						>Password
						{#if errors.password}
							<span class="text-red-500 ml-5">{'*' + errors.password}</span>
						{/if}
					</label>

					<input
						bind:value={password}
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						required
					/>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="remember"
								aria-describedby="remember"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="remember" class="text-gray-500">Remember me</label>
						</div>
					</div>
					<button
						on:click={(e) => {
							e.preventDefault();
							resettingPassword = true;
							errors = {};
						}}
						class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
						>Forgot password?</button
					>
				</div>
				<button
					on:click={() => {
						errors = {};
						submit();
					}}
					class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>{#if loggingIn}Logging in...{:else}
						Sign in
					{/if}
				</button>
			</div>
			{#if errors.login}
				<div class="text-red-500">{errors.login}</div>
			{/if}
			<!-- <p class="text-sm font-light text-gray-500">
                Don’t have an account yet? <a
                    href="/register"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a
                >
            </p> -->
		</div>
	</div>
</div>
