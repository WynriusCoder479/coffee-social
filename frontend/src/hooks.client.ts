import { pocketbase } from '$lib'

pocketbase.authStore.loadFromCookie(document.cookie)

pocketbase.authStore.onChange(() => {
	document.cookie = pocketbase.authStore.exportToCookie({ httpOnly: false })
}, true)
