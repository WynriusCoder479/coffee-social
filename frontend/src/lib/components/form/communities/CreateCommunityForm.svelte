<script lang="ts">
	import { Input, InputAvatar, InputCover } from '$lib/components/ui'
	import { createCommunityInputSchema } from '$lib/validations'
	import type { SuperValidated } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms/client'

	export let form: SuperValidated<typeof createCommunityInputSchema>

	const { form: formData, errors: formErrors } = superForm(form, {
		validators: createCommunityInputSchema
	})
</script>

<form
	action="/c/create"
	method="POST"
	enctype="multipart/form-data"
	class="flex flex-col gap-4">
	<div class="flex flex-col h-24">
		<label
			for="name"
			class="label">
			<span class="ml-2 tracking-wider">Name</span>
			<Input
				type="text"
				class="input rounded-md"
				name="name"
				bind:value={$formData.name} />
		</label>
		<small class=" ml-5 text-error-400-500-token tracking-wide">
			{($formErrors.name && $formErrors.name[0]) || ''}
		</small>
	</div>

	<div class="flex flex-col">
		<label
			for="introduction"
			class="label">
			<span class="ml-2 tracking-wider">Introduction</span>
			<textarea
				rows={5}
				class="textarea rounded-md resize-none"
				name="introduction"
				bind:value={$formData.introduction} />
		</label>
		<small class=" ml-5 text-error-400-500-token tracking-wide">
			{($formErrors.introduction && $formErrors.introduction[0]) || ''}
		</small>
	</div>
	<div class="flex flex-col md:flex-row gap-4">
		<InputAvatar
			label="Avatar"
			name="avatar" />
		<span class="hidden md:block divider-vertical h-40" />
		<InputCover
			label="Cover"
			name="cover" />
	</div>
	<button
		type="submit"
		class="btn variant-filled-primary rounded-md w-full my-4">
		Create Community
	</button>
</form>
