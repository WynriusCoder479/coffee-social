import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import {
	Collections,
	type CommunitiesResponse,
	type List,
	type UsersResponse
} from '$lib/types'

export const GET = (async ({ locals, params, url }) => {
	const userId = params.userId
	const page = url.searchParams.get('page')

	if (!page)
		return new Response(
			JSON.stringify({
				message: 'Invalid page'
			}),
			{ status: 400 }
		)

	const currentPage = parseInt(page)

	try {
		const communities = await locals.pocketbase
			.collection(Collections.Communities)
			.getList<List<CommunitiesResponse<{ creator: UsersResponse }>>>(
				currentPage,
				10,
				{
					filter: `creator = "${userId}" || subscribers ~ "${userId}"`,
					expand: 'creator'
				}
			)

		return new Response(
			JSON.stringify({
				communities,
				next: `${url.origin}/api/communities/subscriptions/${userId}?page=${
					currentPage + 1
				}`
			})
		)
	} catch (err) {
		throw error(500, {
			message: `Internal server error ::: ${err}`
		})
	}
}) satisfies RequestHandler
