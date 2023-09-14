<script>
	import search from '@iconify/icons-tabler/search'
	import usersGroup from '@iconify/icons-tabler/users-group'
	import Icon from '@iconify/svelte'
	import arrowLeft from '@iconify/icons-tabler/arrow-left'
	import chevronDown from '@iconify/icons-tabler/chevron-down'
</script>

<div
	class="relative sm:card w-full sm:w-3/4 lg:w-1/2 mx-auto mt-40 sm:variant-soft-surface py-8 px-4 flex gap-8 flex-col justify-between items-center">
	<a
		href="/"
		class="absolute top-2 left-2 flex items-center gap-2 hover:anchor">
		<Icon
			icon={arrowLeft}
			class="w-6 h-6" />
		Back
	</a>
	<div class="text-center">
		<p class="h3 font-bold tracking-wider">No communities</p>
		<br />
		<p class="font-semibold tracking-wide">
			You currently do not own or are a member of any community !
		</p>
	</div>
	<Icon
		icon={chevronDown}
		class="w-8 h-8" />
	<div class="flex flex-col gap-4 items-center w-3/4 text-center">
		<p class="tracking-wide">
			Let's create your own community or join another community .
		</p>
		<a
			href="/c/create"
			class="btn variant-filled-surface my-4 w-full gap-4">
			<Icon
				icon={usersGroup}
				class="w-6 h-6" />
			Create your own community
		</a>
		<span>Or</span>
		<a
			href="/explore"
			class="btn variant-filled-secondary mt-4 w-full gap-4">
			<Icon
				icon={search}
				class="w-6 h-6" />
			Explore
		</a>
	</div>
</div>
