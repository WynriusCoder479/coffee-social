<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { pocketbase } from '$lib'
	import Icon from '@iconify/svelte'
	import logout from '@iconify/icons-tabler/logout'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'

	const logoutToast = {
		message: 'Signed out successfully',
		timeout: 2000,
		background: 'variant-glass-success'
	} satisfies ToastSettings

	const toastStore = getToastStore()
</script>

<form
	action="/sign-out"
	method="POST"
	use:enhance={() =>
		async ({ result }) => {
			if (result) {
				pocketbase.authStore.clear()
				toastStore.trigger(logoutToast)
			}

			await applyAction(result)
		}}>
	<button
		type="submit"
		class="flex gap-2 py-2 px-4 variant-soft-surface rounded-token">
		<p class="hidden lg:inline-block">Sign Out</p>
		<Icon
			icon={logout}
			class="w-6 h-6" />
	</button>
</form>
