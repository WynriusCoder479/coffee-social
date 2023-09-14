import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import {
	createCommunityInputSchema,
	type CreateCoummunityInputType
} from '$lib/validations'
import { superValidate } from 'sveltekit-superforms/server'
import { Collections, type CommunitiesResponse } from '$lib/types'

export const load = (async ({ locals }) => {
	if (!locals.user || !locals.user.verified) throw redirect(303, '/')

	const initialCreateCommunityInputValues = {
		name: '',
		introduction: ''
	} satisfies CreateCoummunityInputType

	const form = await superValidate(
		initialCreateCommunityInputValues,
		createCommunityInputSchema
	)

	return { form }
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData()

		const avatar = formData.get('avatar')
		const cover = formData.get('cover')

		if (avatar && avatar instanceof File && avatar.size === 0)
			formData.delete('avatar')
		if (cover && cover instanceof File && cover.size === 0)
			formData.delete('cover')

		const form = await superValidate(formData, createCommunityInputSchema)

		if (!form.valid)
			return fail(400, {
				message: 'Bad request',
				errors: JSON.stringify(form.errors)
			})

		if (!locals.user)
			return fail(500, {
				message: 'Internal server error',
				errors: 'User is not sign in'
			})

		formData.append('creator', locals.user.id)
		formData.append('subscribers+', locals.user.id)

		try {
			const { id: communityId } = await locals.pocketbase
				.collection(Collections.Communities)
				.create<CommunitiesResponse>(formData)

			if (communityId) {
				await locals.pocketbase
					.collection(Collections.Users)
					.update(locals.user.id, {
						'subscriptions+': communityId
					})
			}

			throw redirect(307, `/c/${communityId}`)
		} catch (err) {
			console.log(err)
			throw err
		}
	}
} satisfies Actions
