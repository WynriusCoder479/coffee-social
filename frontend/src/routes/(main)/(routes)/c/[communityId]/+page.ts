import type { CommunitiesResponse, List, UsersResponse } from '$lib/types'
import type { PageLoad } from './$types'

export const load = (async ({ fetch, params }) => {
	const communityId = params.communityId

	const fetchCommunity = async () => {
		const res = await fetch(`/api/communities/${communityId}`)
		const data = await res.json()

		return data as CommunitiesResponse<{ creator: UsersResponse }>
	}

	const fetchCommunitySucscribers = async () => {
		const res = await fetch(
			`/api/communities/subscribers/${communityId}?page=1`
		)
		const data = await res.json()

		return data as { subscribers: List<UsersResponse>; next: string }
	}

	return {
		community: await fetchCommunity(),
		subscribers: (await fetchCommunitySucscribers()).subscribers.items
	}
}) satisfies PageLoad
