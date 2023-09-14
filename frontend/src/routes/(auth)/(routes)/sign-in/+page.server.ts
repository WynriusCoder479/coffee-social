import { Collections } from '$lib/types/pocketbase'
import { signInInputSchema, type SignInInputType } from '$lib/validations'
import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	if (locals.user) throw redirect(303, '/')

	const initialSignInValues = {
		usernameOrEmail: '',
		password: ''
	} satisfies SignInInputType

	const form = await superValidate(initialSignInValues, signInInputSchema)

	return { form }
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData()

		const form = await superValidate(formData, signInInputSchema)

		if (!form.valid) {
			return fail(400, {
				message: 'Bad request',
				errors: form.errors
			})
		}

		try {
			await locals.pocketbase
				.collection(Collections.Users)
				.authWithPassword(form.data.usernameOrEmail, form.data.password)
		} catch (error) {
			return fail(500, {
				message: 'Internal server error',
				errors: error
			})
		}

		throw redirect(303, '/')
	}
} satisfies Actions
