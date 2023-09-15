<script lang="ts">
	import { CreateCommunityForm } from '$lib/components/form/communities'
	import { FormHeader } from '$lib/components/shared'

	import arrowLeft from '@iconify/icons-tabler/arrow-left'
	import Icon from '@iconify/svelte'

	export let data

	let form = data.form

	$: user = data.user
</script>

<div class="flex items-center justify-center h-full w-full md:w-[720px] pt-4">
	<div
		class="relative sm:card sm:variant-glass-surface w-full sm:w-3/4 md:w-2/3 lg:w-[512px]">
		<a
			href={`/c/user/${user?.id}`}
			class="hover:anchor absolute top-2 left-2 flex flex-row gap-2">
			<Icon
				icon={arrowLeft}
				class="w-6 h-6" />
			<p>Back</p>
		</a>
		<FormHeader />

		<hr />
		<p class="p-4 text-center h4">Create Post</p>
		<hr />

		<div class="p-4">
			<CreateCommunityForm {form} />
		</div>
	</div>
</div>
