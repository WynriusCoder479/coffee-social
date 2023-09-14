import { Collections, type UsersResponse } from '$lib/types'
import type { List } from '$lib/types/utils'
import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET = (async ({ params, locals, url }) => {
	const communityId = params.communityId

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
		const subscribers = await locals.pocketbase
			.collection(Collections.Users)
			.getList<List<UsersResponse>>(currentPage, 5, {
				filter: `subscriptions ~ "${communityId}"`
			})

		return new Response(
			JSON.stringify({
				subscribers,
				next: `${url.origin}/api/communities/subscribers/${communityId}?page=${
					currentPage + 1
				}`
			})
		)
	} catch (err) {
		throw error(500, {
			message: 'Internal server error'
		})
	}
}) satisfies RequestHandler
