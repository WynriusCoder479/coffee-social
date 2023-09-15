<script lang="ts">
	import type { CommunitiesResponse, UsersResponse } from '$lib/types'
	import { getFileUrl } from '$lib/utils'
	import adminOutlined from '@iconify/icons-eos-icons/admin-outlined'
	import Icon from '@iconify/svelte'
	import { Avatar } from '@skeletonlabs/skeleton'
	import _ from 'lodash'
	import { JoinOrLeaveCommunityButton } from '../form/communities'

	export let subscribers: UsersResponse[]
	export let community: CommunitiesResponse<{ creator: UsersResponse }>
	export let userId: string

	let isCreator: boolean = userId === community.expand?.creator.id

	let avatar = ''
	let cover = ''

	$: {
		if (community.avatar)
			avatar = getFileUrl({
				collectionId: community.collectionId,
				recordId: community.id,
				filename: community.avatar
			})

		if (community.cover)
			cover = getFileUrl({
				collectionId: community.collectionId,
				recordId: community.id,
				filename: community.cover
			})
	}

	$: isSubscriber = _.includes(community.subscribers, userId)

	const getSubscriberAvatar = (subscriber: UsersResponse) => {
		if (!subscriber.avatar) return ''

		if (subscriber.avatar)
			return getFileUrl({
				collectionId: subscriber.collectionId,
				recordId: subscriber.id,
				filename: subscriber.avatar
			})

		return subscriber.avatarUrl
	}
</script>

<div class="shadow-xl">
	<div
		class="w-full bg-no-repeat"
		style="background-image: url('{cover}'); background-size: cover; background-position: center center;">
		<div
			class="flex flex-row gap-5 bg-surface-800 opacity-80 backdrop-blur-sm z-0 p-4 top-0 w-full h-full">
			<div class="flex gap-5">
				<div class="relative inline-block">
					{#if isCreator}
						<span
							class="badge-icon variant-filled-success w-6 h-6 p-0.5 border-2 border-primary-50-900-token absolute top-2 -right-1 z-10">
							<Icon
								icon={adminOutlined}
								class="w-5 h-6" />
						</span>
					{/if}
					<Avatar
						border="border-2 border-primary-50-900-token"
						width="w-24"
						src={avatar}
						initials={community.name.charAt(0).toUpperCase()} />
				</div>
			</div>

			<div class="flex flex-col justify-between py-2">
				<div class="flex flex-row gap-2 items-center">
					<p class="text-white">Subscriber :</p>
					<div class="flex -space-x-4 hover:space-x-0">
						{#each subscribers as subscriber}
							<Avatar
								src={getSubscriberAvatar(subscriber)}
								background="bg-surface-200-700-token"
								initials={subscriber.email}
								border="border-2 border-primary-300-600-token"
								width="w-8" />
						{/each}
						<Avatar
							width="w-8"
							border="border-2 border-primary-300-600-token"
							background="bg-surface-100-800-token"
							initials={`${community.subscribers.length}+`} />
					</div>
				</div>
				<p class="tracking-wider text-white">
					Creator: @/{community.expand?.creator.username}
				</p>
			</div>
		</div>
	</div>
</div>

<div
	class="variant-soft-surface backdrop-blur-sm sticky top-0 flex flex-row gap-4 justify-between p-4 shadow-xl">
	<p class="h2 text-white tracking-widest">c/{community.name}</p>

	<JoinOrLeaveCommunityButton
		communityId={community.id}
		{isSubscriber} />
</div>
