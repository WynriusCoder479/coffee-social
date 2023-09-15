import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import {
	Collections,
	type CommunitiesResponse,
	type UsersResponse
} from '$lib/types'

export const GET = (async ({ locals, params }) => {
	const communityId = params.communityId

	try {
		const community = await locals.pocketbase
			.collection(Collections.Communities)
			.getOne<CommunitiesResponse<{ creator: UsersResponse }>>(communityId, {
				expand: 'creator'
			})

		return new Response(JSON.stringify(community))
	} catch (err) {
		throw error(500, {
			message: `Internal server error ::: ${err}`
		})
	}
}) satisfies RequestHandler
