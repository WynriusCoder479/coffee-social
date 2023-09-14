import type { CommunitiesResponse, List, UsersResponse } from '$lib/types'
import type { PageLoad } from './$types'

export const load = (async ({ parent, params, fetch }) => {
	const { queryClient } = await parent()

	const userId = params.userId

	const prefetchUserSubscriptions = async () => {
		const res = await fetch(`/api/communities/subscriptions/${userId}?page=1`)
		const data = await res.json()

		return data as {
			communities: List<CommunitiesResponse<{ creator: UsersResponse }>>
			next: string
		}
	}

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['communities', userId],
		queryFn: prefetchUserSubscriptions,
		staleTime: 500000
	})
}) satisfies PageLoad
