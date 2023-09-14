import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
	default: async ({ locals }) => {
		locals.pocketbase.authStore.clear()

		locals.user = null

		throw redirect(303, '/')
	}
} satisfies Actions
