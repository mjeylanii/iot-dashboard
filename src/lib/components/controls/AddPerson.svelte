<script>
	import AddPersonModal from '../modals/AddPersonModal.svelte';
	

</script>

<label class="flex flex-col text-center cursor-pointer" for="add-person-modal">
	<div class="avatar">
		<div class="w-24 rounded-full p-8 bg-base-200">
			<img
				src="https://img.icons8.com/material/50/000000/plus.png"
				alt="Add person"
				class="w-1/4 h-1/3"
			/>
		</div>
	</div>
</label>
<AddPersonModal />
