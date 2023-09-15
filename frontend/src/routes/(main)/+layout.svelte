<script lang="ts">
	import { LeftSidebar, Topbar } from '$lib/components/navbar'
	import { scrollStore } from '$lib/stores'
	import { AppShell } from '@skeletonlabs/skeleton'
	import type { ComponentEvents } from 'svelte'

	export let data

	$: user = data.user

	const scrollHandler = (event: ComponentEvents<AppShell>['scroll']) => {
		scrollStore.set(event.currentTarget.scrollTop)
	}
</script>

<svelte:head>
	<title>Coffee</title>
	<meta
		name="description"
		content="Coffee social network" />
</svelte:head>

<AppShell
	on:scroll={scrollHandler}
	class="shadow-lg">
	<svelte:fragment slot="header">
		<Topbar {user} />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<LeftSidebar {user} />
	</svelte:fragment>

	<slot />
</AppShell>
