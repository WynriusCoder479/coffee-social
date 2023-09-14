<script lang="ts">
	import {
		getModeOsPrefers,
		modeCurrent,
		setInitialClassState,
		setModeCurrent,
		setModeUserPrefers,
		type SvelteEvent
	} from '@skeletonlabs/skeleton'
	import { onMount } from 'svelte'
	import sun from '@iconify/icons-tabler/sun'
	import moon from '@iconify/icons-tabler/moon'
	import Icon from '@iconify/svelte'

	const handleModeSwitcher = () => {
		$modeCurrent = !$modeCurrent

		setModeUserPrefers($modeCurrent)

		setModeCurrent($modeCurrent)
	}

	const onKeyDown = (event: SvelteEvent<KeyboardEvent, HTMLButtonElement>) => {
		if (['Enter', 'Space'].includes(event.code)) {
			event.preventDefault()

			event.currentTarget.click()
		}
	}

	onMount(() => {
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers())
		}
	})

	$: icon = !$modeCurrent ? sun : moon
</script>

<svelte:head>
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<button
	on:click={handleModeSwitcher}
	on:keydown={onKeyDown}
	class="btn-icon rounded-token variant-soft-surface">
	<Icon
		{icon}
		class="w-6 h-6" />
</button>
