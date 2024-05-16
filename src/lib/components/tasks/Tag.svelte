<script lang="ts">
	export const name = '';
	let tags = [
		{
			id: 1,
			name: 'IOS APP',
			color: 'green',
		},
		{
			id: 2,
			name: 'ANDROID APP',
			color: 'blue',
		},
		{
			id: 3,
			name: 'WEB APP',
			color: 'yellow',
		},
		{
			id: 4,
			name: 'DESKTOP APP',
			color: 'red',
		},
		{
			id: 5,
			name: 'API',
			color: 'purple',
		},
		{
			id: 6,
			name: 'DATABASE',
			color: 'pink',
		},
		{
			id: 7,
			name: 'BACKEND',
			color: 'indigo',
		},
		{
			id: 8,
			name: 'FRONTEND',
			color: 'teal',
		},
		{
			id: 9,
			name: 'DESIGN',
			color: 'gray',
		},
		{
			id: 10,
			name: 'TESTING',
			color: 'orange',
		},
		{
			id: 11,
			name: 'BUG',
			color: 'red',
		},
		{
			id: 12,
			name: 'FEATURE',
			color: 'yellow',
		},
		{
			id: 13,
			name: 'UI/UX',
			color: 'blue',
		},
	];
</script>

{#each tags as tag}
	<span
		class="px-2 py-1 flex items-center text-xs rounded-md font-semibold text-{tag.color}-500 bg-{tag.color}-50"
	>
		{tag.name}
	</span>
{/each}
