<!-- MessagesList.svelte -->
<script lang="ts">
	import MessageItem from './MessageItem.svelte';

	interface Message {
		imgAlt?: string;
		imgSrc?: string;
		userName: string;
		messageText: string;
	}

	export let messages: Message[] = [];
</script>

<ul>
	{#each messages as message}
		<MessageItem
			imgAlt={message.imgAlt ? message.imgAlt : ''}
			imgSrc={message.imgSrc ? message.imgSrc : ''}
			userName={message.userName}
			messageText={message.messageText}
		/>
	{/each}
</ul>
