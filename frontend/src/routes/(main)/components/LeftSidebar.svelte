<script lang="ts">
	import { page } from '$app/stores'
	import { cn } from '$lib'
	import { routes } from '$lib/constants'
	import type { UsersResponse } from '$lib/types'
	import Icon from '@iconify/svelte'
	import quillPenLine from '@iconify/icons-ri/quill-pen-line'
	import _ from 'lodash'
	import type { AuthModel } from 'pocketbase'
	import SignOutButton from './SignOutButton.svelte'

	export let user: AuthModel | UsersResponse

	$: isActive = (href: string) =>
		href.split('/')[1] === $page.url.pathname.split('/')[1]

	$: href = (route: string) => {
		let link: string = route

		if (route === '/c') link = `${route}/subscriptions/${user?.id}`

		if (route === '/profile') link = `${route}/${user?.id}`

		return link
	}
</script>

<div class="variant-soft-surface p-4 h-full flex flex-col justify-between">
	<nav class="list-nav pt-10">
		<ul class="flex flex-col gap-4">
			{#each routes as { route, label, icon }}
				<li>
					<a
						href={href(route)}
						class={cn(isActive(route) && 'bg-primary-50-900-token')}>
						<Icon
							{icon}
							class="w-6 h-6" />
						<p class="hidden lg:inline-block flex-auto text-token">{label}</p>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="flex flex-col gap-20 pb-10 justify-center items-center">
		<a
			href="/post/create"
			class="variant-filled-primary px-4 py-2 rounded-token flex gap-2 items-center">
			<Icon
				icon={quillPenLine}
				class="w-6 h-6" />
			<p class="hidden lg:inline-block">Create</p>
		</a>
		{#if user}
			<SignOutButton />
		{:else}
			<div />
		{/if}
	</div>
</div>
