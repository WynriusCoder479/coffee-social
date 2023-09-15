<script lang="ts">
	import { signInInputSchema } from '$lib/validations'
	import type { SuperValidated } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms/client'
	import watchLoop from '@iconify/icons-line-md/watch-loop'
	import watchOffLoop from '@iconify/icons-line-md/watch-off-loop'
	import Icon from '@iconify/svelte'

	import _ from 'lodash'
	import { applyAction, enhance } from '$app/forms'

	import loadingLoop from '@iconify/icons-line-md/loading-loop'
	import { pocketbase } from '$lib'
	import { Input } from '$lib/components/ui'

	export let form: SuperValidated<typeof signInInputSchema>

	const { form: formData, errors: formErrors } = superForm(form, {
		validators: signInInputSchema
	})

	$: isShowPassword = false

	$: showPasswordIcon = isShowPassword ? watchOffLoop : watchLoop

	const handleShowPasswor = () => (isShowPassword = !isShowPassword)

	$: isDisabled = !(
		_.filter($formErrors, error => error !== undefined).length === 0
	)
	$: isLoading = false

	const handleSubmit = () => (isLoading = true)
</script>

<div class="p-4">
	<form
		action="/sign-in"
		method="POST"
		on:submit|preventDefault={handleSubmit}
		use:enhance={() =>
			async ({ result }) => {
				if (result) isLoading = false

				pocketbase.authStore.loadFromCookie(document.cookie)

				await applyAction(result)
			}}>
		<div class="flex flex-col h-24">
			<label
				for="usernameOrEmail"
				class="label">
				<span class="ml-2 tracking-wider">Username or Email</span>
				<Input
					type="text"
					class="input rounded-md"
					name="usernameOrEmail"
					bind:value={$formData.usernameOrEmail} />
			</label>
			<small class=" ml-5 text-error-400-500-token tracking-wide">
				{$formErrors.usernameOrEmail || ''}
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
					<button on:click|preventDefault={handleShowPasswor}>
						<Icon
							icon={showPasswordIcon}
							class="w-6 h-6" />
					</button>
				</div>
			</label>
			<small class=" ml-5 text-error-400-500-token tracking-wide">
				{$formErrors.password || ''}
			</small>
		</div>
		<button
			disabled={isDisabled || isLoading}
			type="submit"
			class="btn variant-filled-primary rounded-md w-full my-2">
			{#if isLoading}
				<Icon
					icon={loadingLoop}
					class="w-6 h-6" />
			{/if}
			Sign In
		</button>
	</form>
</div>
