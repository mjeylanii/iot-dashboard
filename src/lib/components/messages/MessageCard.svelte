<!-- MainComponent.svelte -->
<script lang="ts">
	import MessagesList from './MessagesList.svelte';

	const messages = [
		{
			userName: 'Maurice',
			messageText: 'Hey Enoch, did you read the Nextjs doc?',
		},
		{
			userName: 'Enoch',
			messageText: "Yeah! that's one of the best docs",
		},
		{
			userName: 'Cristiano',
			messageText: 'Tailwind JIT is a game changer!',
		},
		{
			userName: 'Messi',
			messageText: 'Yeah can confirm that on Austin 3:16',
		},
	];
</script>

<div class="w-full sm:w-1/2 xl:w-1/3">
	<div class="mb-4">
		<div class="shadow-lg rounded-2xl p-4 bg-white w-full">
			<p class="font-bold text-md text-black">Messages</p>
			<MessagesList {messages} />
		</div>
	</div>
</div>
