<script lang="ts">
	import type { AuthSystemFields, UsersRecord } from '$lib/types/pocketbase.type';

	import { EditPersonModal } from '$components';

	export let user: UsersRecord & AuthSystemFields;
</script>

<EditPersonModal {user} />
{#if user.verified == true}
	<div class="flex flex-col gap-2 text-center">
		<div class="avatar online">
			<div class="w-24 rounded-full">
				<img src={user?.avatar} alt={user.name} />
			</div>
		</div>
		<label class="cursor-pointer" for={'edit-person-modal' + user.id}>
			<h1 class="text-xs font-bold">{user.name}</h1>
		</label>
	</div>
{:else}
	<div class="flex flex-col gap-2 text-center">
		<div class="avatar offline">
			<div class="w-24 rounded-full">
				<img src={user.avatar} alt={user.name} />
			</div>
		</div>

		<label class="cursor-pointer" for={'edit-person-modal' + user.id}>
			<h1 class="text-xs font-bold">{user.name}</h1>
		</label>
	</div>
{/if}
