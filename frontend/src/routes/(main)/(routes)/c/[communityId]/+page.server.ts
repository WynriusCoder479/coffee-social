import { error } from '@sveltejs/kit'
import type { Actions } from './$types'
import { Collections, type CommunitiesResponse } from '$lib/types'

export const actions = {
	join: async ({ params, locals }) => {
		const communityId = params.communityId
		const userId = locals.user?.id

		try {
			const { id: CommunityId } = await locals.pocketbase
				.collection(Collections.Communities)
				.update<CommunitiesResponse>(communityId, {
					'subscribers+': userId
				})

			if (CommunityId) {
				await locals.pocketbase.collection(Collections.Users).update(userId, {
					'subscriptions+': CommunityId
				})
			}
		} catch (err) {
			throw error(500, {
				message: `Internal server error ::: ${err}`
			})
		}
	},
	leave: async ({ params, locals }) => {
		const communityId = params.communityId
		const userId = locals.user?.id

		try {
			const { id: CommunityId } = await locals.pocketbase
				.collection(Collections.Communities)
				.update<CommunitiesResponse>(communityId, {
					'subscribers-': userId
				})

			if (CommunityId) {
				await locals.pocketbase.collection(Collections.Users).update(userId, {
					'subscriptions-': CommunityId
				})
			}
		} catch (err) {
			throw error(500, {
				message: `Internal server error ::: ${err}`
			})
		}
	}
} satisfies Actions
