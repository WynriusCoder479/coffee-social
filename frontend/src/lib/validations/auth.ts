import { z } from 'zod'

export const signInInputSchema = z.object({
	usernameOrEmail: z
		.string()
		.nonempty({ message: 'Username or email is required' })
		.trim(),
	password: z.string().nonempty({ message: 'Password is required' })
})

export type SignInInputType = z.infer<typeof signInInputSchema>

export const signUpInputSchema = z
	.object({
		email: z
			.string()
			.email({ message: 'Invalid email' })
			.nonempty({ message: 'Email is required' })
			.trim(),
		username: z
			.string()
			.min(1, { message: 'Username must longer than 1 characters' })
			.max(50, { message: 'Username must not be longer than 50 characters' })
			.trim(),
		password: z
			.string()
			.min(8, { message: 'Password must longer than 8 characters' })
			.max(50, { message: 'Passwod must not be longer 50 character' })
			.regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
				message: 'Password must have at least 1 uppercase charater and 1 digit'
			})
			.trim(),
		passwordConfirm: z
			.string()
			.min(8, { message: 'Passworn confirm must longer than 8 characters' })
			.max(50, { message: 'Passwod must not be longer 50 character' })
			.regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
				message:
					'Password confirm must have at least 1 uppercase charater and 1 digit'
			})
			.trim()
	})
	.superRefine(({ password, passwordConfirm }, context) => {
		if (passwordConfirm !== password)
			context.addIssue({
				code: 'custom',
				message: 'Password confirm must macth to password',
				path: ['passwordConfirm']
			})
	})

export type SignUpInputType = z.infer<typeof signUpInputSchema>
