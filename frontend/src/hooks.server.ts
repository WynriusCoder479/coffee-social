import { createPocketbaseInstance } from '$lib'
import { Collections } from '$lib/types/pocketbase'

import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
	let theme = ''

	const cookieTheme = event.cookies.get('theme')

	if (cookieTheme) {
		theme = cookieTheme
	} else {
		event.cookies.set('theme', 'skeleton')
		theme = 'skeleton'
	}

	event.locals.pocketbase = createPocketbaseInstance()
	event.locals.pocketbase.authStore.loadFromCookie(
		event.request.headers.get('cookie') || ''
	)

	try {
		if (event.locals.pocketbase.authStore.isValid)
			await event.locals.pocketbase.collection(Collections.Users).authRefresh()
	} catch (_) {
		event.locals.pocketbase.authStore.clear()
	}

	event.locals.user = event.locals.pocketbase.authStore.model

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('data-theme=""', `data-theme="${theme}"`)
	})

	response.headers.append(
		'set-cookie',
		event.locals.pocketbase.authStore.exportToCookie({
			secure: false
		})
	)

	return response
}) satisfies Handle
