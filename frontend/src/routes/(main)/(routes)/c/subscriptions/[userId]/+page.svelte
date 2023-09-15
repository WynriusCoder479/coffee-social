<script lang="ts">
	import { page } from '$app/stores'
	import { getUserSubscriptions } from '$lib/apis'
	import Icon from '@iconify/svelte'
	import loadingTwoToneLoop from '@iconify/icons-line-md/loading-twotone-loop'
	import codePlus from '@iconify/icons-tabler/code-plus'
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { CommunityCard, NoCommunity } from '$lib/components/communities'

	let userId = $page.params.userId

	const fetchUserSubscriptions = async ({ pageParam = 1 }) => {
		return await getUserSubscriptions({ userId, page: pageParam })
	}

	$: userSubscriptionsQuery = createInfiniteQuery({
		queryKey: ['communities', userId],
		queryFn: fetchUserSubscriptions,
		staleTime: 500000,
		getNextPageParam: lastpage => {
			if (lastpage.next) {
				const nextUrl = new URLSearchParams(new URL(lastpage.next).search)

				const nextCursor = nextUrl.get('page')

				if (nextCursor) {
					return +nextCursor
				}

				return undefined
			}
		}
	})
</script>

{#if $userSubscriptionsQuery.isLoading}
	<div class="w-full h-full flex justify-center items-center">
		<Icon
			icon={loadingTwoToneLoop}
			class="w-14 h-14" />
	</div>
{/if}
{#if $userSubscriptionsQuery.isError}
	<div class="w-full h-full justify-center items-center">
		<p>Something wrong</p>
	</div>
{/if}
{#if $userSubscriptionsQuery.isSuccess}
	{#each $userSubscriptionsQuery.data.pages as { communities }}
		{#if communities.items.length === 0}
			<NoCommunity />
		{:else}
			<div
				class="w-full h-full flex flex-col py-20 px-6 items-center gap-5 scroll-smooth">
				{#each communities.items as community}
					<CommunityCard
						{community}
						isCreator={community.expand?.creator.id === userId} />
				{/each}
			</div>

			<section class="absolute bottom-3 right-3 z-10">
				<a
					href={`/c/create`}
					class="btn variant-soft-primary">
					<Icon
						icon={codePlus}
						class="w-6 h-6" />
					<p class="hidden md:inline-block">Create community</p>
				</a>
			</section>
		{/if}
	{/each}
{/if}
