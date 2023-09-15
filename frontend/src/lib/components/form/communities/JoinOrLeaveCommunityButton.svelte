<script lang="ts">
	export let isSubscriber: boolean
	export let communityId: string
</script>

<form
	action={`/c/${communityId}`}
	method="POST">
	{#if !isSubscriber}
		<button
			type="submit"
			formaction="?/join"
			class="btn text-white variant-filled-tertiary rounded-md">
			Join
		</button>
	{:else}
		<button
			type="submit"
			formaction="?/leave"
			class="btn text-white variant-filled-tertiary rounded-md">
			Leave
		</button>
	{/if}
</form>
