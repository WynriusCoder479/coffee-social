<script lang="ts">
	import { signUpInputSchema } from '$lib/validations'
	import watchLoop from '@iconify/icons-line-md/watch-loop'
	import watchOffLoop from '@iconify/icons-line-md/watch-off-loop'
	import Icon from '@iconify/svelte'
	import type { SuperValidated } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms/client'
	import { applyAction, enhance } from '$app/forms'
	import _ from 'lodash'

	import loadingLoop from '@iconify/icons-line-md/loading-loop'
	import { pocketbase } from '$lib'
	import { Input } from '$lib/components/ui'

	export let form: SuperValidated<typeof signUpInputSchema>

	const { form: formData, errors: formErrors } = superForm(form, {
		validators: signUpInputSchema
	})

	$: isShowPassword = false

	$: showPasswordIcon = isShowPassword ? watchOffLoop : watchLoop

	const handleShowPassword = () => (isShowPassword = !isShowPassword)

	$: isDisabled = !(
		_.filter($formErrors, error => error !== undefined).length === 0
	)
	$: isLoading = false

	const handleSubmit = () => (isLoading = true)
</script>

<div class="p-4">
	<form
		action="/sign-up"
		method="POST"
		on:submit|preventDefault={handleSubmit}
		use:enhance={() =>
			async ({ result }) => {
				if (result) {
					isLoading = false
				}

				pocketbase.authStore.loadFromCookie(document.cookie)

				await applyAction(result)
			}}>
		<div class="flex flex-col h-24">
			<label
				for="email"
				class="label">
				<span class="ml-2 tracking-wider">Email</span>
				<Input
					type="email"
					class="input rounded-md"
					name="email"
					bind:value={$formData.email} />
			</label>
			<small class=" ml-5 text-error-400-500-token tracking-wide">
				{($formErrors.email && $formErrors.email[0]) || ''}
			</small>
		</div>

		<div class="flex flex-col h-24">
			<label
				for="username"
				class="label">
				<span class="ml-2 tracking-wider">Username</span>
				<Input
					type="text"
					class="input rounded-md"
					name="username"
					bind:value={$formData.username} />
			</label>
			<small class=" ml-5 text-error-400-500-token tracking-wide">
				{($formErrors.username && $formErrors.username[0]) || ''}
			</small>
		</div>

		<div class="flex flex-col h-24">
			<label
				for="password"
				class="label">
				<span class="ml-2 tracking-wider">Password</span>
				<div class="input-group rounded-md flex items-center">
					<Input
						name="password"
						class="w-full"
						type={isShowPassword ? 'text' : 'password'}
						bind:value={$formData.password} />
					<button on:click|preventDefault={handleShowPassword}>
						<Icon
							icon={showPasswordIcon}
							class="w-6 h-6" />
					</button>
				</div>
			</label>
			<small class=" ml-5 text-error-400-500-token tracking-wide">
				{($formErrors.password && $formErrors.password[0]) || ''}
			</small>
		</div>

		<div class="flex flex-col h-24">
			<label
				for="password"
				class="label">
				<span class="ml-2 tracking-wider">Password Confirm</span>
				<div class="input-group rounded-md flex items-center">
					<Input
						name="passwordConfirm"
						class="w-full"
						type={isShowPassword ? 'text' : 'password'}
						bind:value={$formData.passwordConfirm} />
					<button on:click|preventDefault={handleShowPassword}>
						<Icon
							icon={showPasswordIcon}
							class="w-6 h-6" />
					</button>
				</div>
			</label>
			<small class=" ml-5 text-error-400-500-token tracking-wide">
				{($formErrors.passwordConfirm && $formErrors.passwordConfirm[0]) || ''}
			</small>
		</div>
		<button
			type="submit"
			disabled={isDisabled || isLoading}
			class="btn variant-filled-primary rounded-md w-full my-2">
			{#if isLoading}
				<Icon
					icon={loadingLoop}
					class="w-6 h-6" />
			{/if}
			Sign Up
		</button>
	</form>
</div>
