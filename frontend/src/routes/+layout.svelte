<script lang="ts">
	import '../app.postcss'

	import {
		arrow,
		autoUpdate,
		computePosition,
		flip,
		offset,
		shift
	} from '@floating-ui/dom'
	import {
		Modal,
		Toast,
		autoModeWatcher,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton'
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { fade, slide } from 'svelte/transition'

	export let data

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

	initializeStores()

	$: client = data.queryClient
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<Modal
	transitionIn={fade}
	transitionOut={fade}
	transitionInParams={{ duration: 300 }}
	transitionOutParams={{ duration: 300 }} />
<Toast
	position="b"
	transitionIn={slide}
	transitionOut={slide}
	transitionInParams={{ duration: 300 }}
	transitionOutParams={{ duration: 300 }} />

<QueryClientProvider {client}>
	<slot />
</QueryClientProvider>
