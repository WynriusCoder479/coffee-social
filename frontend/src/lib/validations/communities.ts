import { z } from 'zod'

export const createCommunityInputSchema = z.object({
	name: z
		.string()
		.nonempty({ message: 'Community name is required' })
		.min(1, { message: 'Coummunity name must be longer than 1 character' })
		.max(20, { message: 'Community name no longer than 20 charaters' })
		.trim(),
	introduction: z.string().trim()
})

export type CreateCoummunityInputType = z.infer<
	typeof createCommunityInputSchema
>
