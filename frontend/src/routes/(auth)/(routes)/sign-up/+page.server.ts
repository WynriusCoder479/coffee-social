import { Collections, type UsersResponse } from '$lib/types/pocketbase'
import { signUpInputSchema, type SignUpInputType } from '$lib/validations'
import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/')
	}

	const intialSignUpValues = {
		email: '',
		username: '',
		password: '',
		passwordConfirm: ''
	} satisfies SignUpInputType

	const form = await superValidate(intialSignUpValues, signUpInputSchema)

	return { form }
}) satisfies PageServerLoad

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData()

		const form = await superValidate(formData, signUpInputSchema)

		if (!form.valid) {
			return fail(400, {
				message: 'Bad request',
				errors: form.errors
			})
		}

		try {
			await locals.pocketbase
				.collection(Collections.Users)
				.create<UsersResponse>(formData)
		} catch (error) {
			return fail(500, {
				message: 'Internal server error',
				errors: error
			})
		}

		throw redirect(303, '/sign-in')
	}
} satisfies Actions
