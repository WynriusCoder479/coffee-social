<script lang="ts">
	import Icon from '@iconify/svelte'
	import googleIcon from '@iconify/icons-logos/google-icon'
	import githubIcon from '@iconify/icons-logos/github-icon'
	import discordIcon from '@iconify/icons-logos/discord-icon'
	import { Collections, type UsersResponse } from '$lib/types/pocketbase'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { invalidateAll } from '$app/navigation'
	import { pocketbase } from '$lib'

	const toast = (message: string): ToastSettings => {
		return {
			message,
			timeout: 5000
		}
	}

	const toastStore = getToastStore()

	const signInWithProvider = async (
		provider: 'google' | 'github' | 'discord'
	) => {
		try {
			const { record, meta } = await pocketbase
				.collection(Collections.Users)
				.authWithOAuth2({
					provider
				})

			console.log(meta)

			const { avatarUrl, username } = await pocketbase
				.collection(Collections.Users)
				.getOne<UsersResponse>(record.id)

			if (!avatarUrl && !username) {
				await pocketbase.collection(Collections.Users).update(record.id, {
					avatarUrl: meta?.avatarUrl,
					username: meta?.username
				})
			}
		} catch (error) {
			toastStore.trigger(toast(`Cannot sign in with ${provider}`))
		} finally {
			await invalidateAll()
		}
	}
</script>

<div class="p-4 mt-2 flex flex-col gap-4">
	<button
		on:click|preventDefault={async () => await signInWithProvider('google')}
		class="btn w-full variant-glass-surface rounded-md">
		<Icon
			icon={googleIcon}
			class="w-6 h-6" />
		<p>Continue with google</p>
	</button>
	<button
		on:click|preventDefault={async () => await signInWithProvider('github')}
		class="btn w-full variant-glass-surface rounded-md">
		<Icon
			icon={githubIcon}
			class="w-6 h-6" />
		<p>Continue with github</p>
	</button>
	<button
		on:click|preventDefault={async () => await signInWithProvider('discord')}
		class="btn w-full variant-glass-surface rounded-md">
		<Icon
			icon={discordIcon}
			class="w-6 h-6" />
		<p>Continue with discord</p>
	</button>
</div>
