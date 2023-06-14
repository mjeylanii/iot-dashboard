<input type="checkbox" id="add-person-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<label for="add-person-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<!-- Add person -->
		<h3 class="text-lg font-bold">Add person</h3>
		<br />
		<div class="flex flex-row gap-4 text-center">
			<div class="avatar">
				<div class="w-24 rounded-full">
					<img src={'https://picsum.photos/200'} alt="profile" />
				</div>
			</div>
			<div class="form-control my-auto">
				<!-- <label class="label" for="person-image">
					<span class="label-text">Profile image</span>
				</label> -->
				<input type="file" class="file-input w-full max-w-xs" />
			</div>
		</div>
		<br />

		<div class="form-control">
			<label class="label" for="person-name">
				<span class="label-text">Name</span>
			</label>
			<input id="person-name" type="text" placeholder="John Doe" class="input input-bordered" />

			<label class="label" for="person-type">
				<span class="label-text">Type</span>
			</label>
			<select id="person-type" class="select select-bordered w-full max-w-xs">
				<option>Visitor</option>
				<option>Employee</option>
			</select>

			<label class="label" for="person-username">
				<span class="label-text">Username</span>
			</label>
			<input id="person-username" type="text" placeholder="johndoe" class="input input-bordered" />

			<label class="label" for="person-password">
				<span class="label-text">Password</span>
			</label>
			<input id="person-password" type="text" placeholder="********" class="input input-bordered" />

			<label class="label" for="person-email">
				<span class="label-text">Email</span>
			</label>
			<input id="person-email" type="text" placeholder="" class="input input-bordered" />

			<label class="label" for="person-phone">
				<span class="label-text">Phone</span>
			</label>
			<input id="person-phone" type="text" placeholder="	" class="input input-bordered" />

			<label class="label" for="person-address">
				<span class="label-text">Address</span>
			</label>

			<input id="person-address" type="text" placeholder="" class="input input-bordered" />

			<br />
			<button class="btn btn-primary">Save</button>
		</div>
	</div>
</div>
