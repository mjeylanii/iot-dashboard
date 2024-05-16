<script lang="ts">
	export let imgAlt: string;
	export let imgSrc: string;
	export let userName: string;
	export let messageText: string;
</script>

<li class="flex items-center my-6 space-x-2">
	<span class="block relative">
		<img alt={imgAlt} src={imgSrc} class="mx-auto object-cover rounded-full h-10 w-10" />
	</span>
	<div class="flex flex-col">
		<span class="text-sm text-gray-900 font-semibold ml-2">{userName}</span>
		<span class="text-sm text-gray-400 ml-2">{messageText}</span>
	</div>
</li>
