<script lang="ts">
	import { getCommunitySubscribers } from '$lib/apis'
	import type {
		CommunitiesResponse,
		UsersResponse
	} from '$lib/types/pocketbase'
	import { getFileUrl } from '$lib/utils'
	import adminOutlined from '@iconify/icons-eos-icons/admin-outlined'
	import image from '@iconify/icons-line-md/image'
	import arrowLoopRight from '@iconify/icons-tabler/arrow-loop-right'
	import Icon from '@iconify/svelte'
	import { Avatar } from '@skeletonlabs/skeleton'
	import { createQuery } from '@tanstack/svelte-query'

	export let community: CommunitiesResponse<{
		creator: UsersResponse
	}>

	export let isCreator: boolean = false

	const getCover = (cover: string) => {
		if (!cover) return ''

		if (cover)
			return getFileUrl({
				collectionId: community.collectionId,
				recordId: community.id,
				filename: cover
			})
	}

	$: cover = getCover(community.cover)

	$: readMore = community.introduction.split(' ').length > 25
	$: isReadMore = community.introduction.split(' ').length < 25

	const handleReadMore = () => (readMore = !readMore)

	$: communitySubscribersQuery = createQuery({
		queryKey: ['subscribers', community.id],
		queryFn: async () =>
			await getCommunitySubscribers({ communityId: community.id, page: 1 }),
		staleTime: 500000
	})
</script>

<div class="relative rounded-md w-full lg:w-1/2 overflow-hidden">
	<div
		class="w-full bg-no-repeat"
		style="background-image: url('{cover}'); background-size: cover;  background-position: center center; ">
		<div
			class="flex flex-col gap-5 bg-surface-800 opacity-80 backdrop-blur-sm z-0 p-4 top-0 left-0 h-full w-full">
			<a
				href={`/c/${community.id}`}
				class="absolute top-2 right-2 btn variant-filled-surface">
				<p class="hidden md:block">Go to community</p>
				<Icon
					icon={arrowLoopRight}
					class="w-5 h-5" />
			</a>
			<div class="flex gap-5">
				<div class="relative inline-block">
					{#if isCreator}
						<span
							class="badge-icon p-1 w-7 h-7 border-2 border-primary-300-600-token variant-filled-success absolute top-0 -right-0 z-10">
							<Icon
								icon={adminOutlined}
								class="w-6 h-6" />
						</span>
					{/if}

					<div
						class="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden border-2 border-primary-300-600-token">
						{#if community.avatar}
							<img
								src={getFileUrl({
									collectionId: community.collectionId,
									recordId: community.id,
									filename: community.avatar
								})}
								class="w-full min-h-full"
								alt={community.avatar} />
						{:else}
							<Icon
								icon={image}
								class="w-7 h-7" />
						{/if}
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<p class="h3 text-surface-50">
						c/{community.name.split('').slice(0, 10).join('')}
					</p>
					<p class="text-surface-50">
						Creator: {community.expand?.creator.username}
					</p>
				</div>
			</div>

			<div class="flex flex-row gap-2 items-center">
				<p>Subscriber :</p>
				<div class="flex -space-x-4 hover:space-x-0">
					{#if $communitySubscribersQuery.isSuccess}
						{#each $communitySubscribersQuery.data.subscribers.items as subscriber}
							<Avatar
								src={getFileUrl({
									collectionId: subscriber.collectionId,
									recordId: subscriber.id,
									filename: subscriber.avatar
								}) || ''}
								initials="U"
								border="border-2 border-primary-300-600-token"
								width="w-8" />
						{/each}
						<Avatar
							width="w-8"
							border="border-2 border-primary-300-600-token"
							background="bg-surface-100-800-token"
							initials={`${community.subscribers.length}+`} />
					{/if}
				</div>
			</div>

			<div>
				<hr class="bg-surface-300-600-token" />

				<div class="flex flex-col gap-2">
					<span class="h5 font-bold text-surface-50">Introduction:</span>
					<p class="text-surface-50">
						{!readMore
							? community.introduction
							: `${community.introduction
									.split(' ')
									.slice(0, 25)
									.join(' ')} ...`}
					</p>
					{#if !isReadMore}
						<button
							on:click={handleReadMore}
							class="text-surface-400 hover:anchor">Read more</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
