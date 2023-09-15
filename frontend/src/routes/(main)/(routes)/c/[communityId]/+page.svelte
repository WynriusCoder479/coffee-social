<script lang="ts">
	import { CommunityHeader } from '$lib/components/communities'

	export let data

	let community = data.community
	let userId = data.user?.id
	let subscribers = data.subscribers
</script>

<div class="w-full h-full">
	<CommunityHeader
		{community}
		{userId}
		{subscribers} />
</div>
