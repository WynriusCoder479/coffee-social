import { QueryClient } from '@tanstack/svelte-query'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'

export const load = (async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	})

	return {
		queryClient
	}
}) satisfies LayoutLoad
