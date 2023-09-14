<script lang="ts">
	import { getFileUrl } from '$lib'
	import type { UsersResponse } from '$lib/types'
	import { AppBar, Avatar } from '@skeletonlabs/skeleton'
	import type { AuthModel } from 'pocketbase'
	import Icon from '@iconify/svelte'
	import coffeeLoop from '@iconify/icons-line-md/coffee-loop'
	import ModeSwitcher from '$lib/components/shared/ModeSwitcher.svelte'

	export let user: AuthModel | UsersResponse

	let avatar: string = ''

	$: {
		if (user && user.avatar)
			avatar = getFileUrl({
				collectionId: user.collectionId,
				recordId: user.id,
				filename: user.avatar
			})

		if (user && user.avatarUrl) avatar = user.avatarUrl
	}
</script>

<AppBar
	padding="py-3 px-5"
	background="variant-soft-surface">
	<svelte:fragment slot="lead">
		<a
			href="/"
			class="flex flex-row gap-2 justify-center items-center">
			<Icon
				icon={coffeeLoop}
				class="w-10 h-10" />
			<span class="hidden md:inline-block h3 font-semibold">Coffee</span>
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<div class="flex gap-3 justify-center items-center">
			{#if !user}
				<a
					href="/sign-in"
					class="btn variant-soft-secondary">Sign In</a>
			{:else}
				<button>
					<Avatar
						width="w-[43px]"
						border="border-2 border-surface-200-700-token hover:border-primary-200-700-token"
						rounded="rounded-token"
						src={avatar}
						initials={user.email} />
				</button>
			{/if}
			<ModeSwitcher />
		</div>
	</svelte:fragment>
</AppBar>
