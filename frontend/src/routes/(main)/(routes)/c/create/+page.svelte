<script lang="ts">
	import { FormHeader } from '$lib/components/shared'
	import { Input, InputAvatar, InputCover } from '$lib/components/ui'

	import { createCommunityInputSchema } from '$lib/validations'
	import arrowLeft from '@iconify/icons-tabler/arrow-left'
	import Icon from '@iconify/svelte'
	import { superForm } from 'sveltekit-superforms/client'

	export let data

	$: user = data.user

	const { form: formData, errors: formErrors } = superForm(data.form, {
		validators: createCommunityInputSchema
	})
</script>

<div class="flex items-center justify-center h-full w-full md:w-[720px] pt-4">
	<div
		class="relative sm:card sm:variant-glass-surface w-full sm:w-3/4 md:w-2/3 lg:w-[512px]">
		<a
			href={`/c/user/${user?.id}`}
			class="hover:anchor absolute top-2 left-2 flex flex-row gap-2">
			<Icon
				icon={arrowLeft}
				class="w-6 h-6" />
			<p>Back</p>
		</a>
		<FormHeader />
		<hr />
		<p class="p-4 text-center h4">Create Post</p>
		<hr />

		<div class="p-4">
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
		</div>
	</div>
</div>
