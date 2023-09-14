<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface $$Props extends HTMLInputAttributes {
		value: string
	}

	export let value: string
</script>

<input
	{...$$restProps}
	bind:value />
