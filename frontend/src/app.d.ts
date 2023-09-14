import type { UsersResponse } from '$lib/types'

declare global {
	namespace App {
		interface Locals {
			pocketbase: import('pocketbase').default
			user: import('pocketbase').AuthModel | UsersResponse
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
