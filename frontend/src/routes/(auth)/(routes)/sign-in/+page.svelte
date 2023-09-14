<script lang="ts">
	import { FormHeader } from '$lib/components/shared'
	import arrowSmallLeft from '@iconify/icons-line-md/arrow-small-left'
	import Icon from '@iconify/svelte'
	import OAuthForm from '../../components/OAuthForm.svelte'
	import { Divider } from '$lib/components/ui'
	import SignInForm from '../../components/SignInForm.svelte'

	export let data

	$: form = data.form
</script>

<div
	class="relative sm:card sm:variant-glass-surface w-full sm:w-3/4 md:w-2/3 lg:w-[512px]">
	<a
		href="/"
		class="absolute top-1 left-2 flex flex-row items-center hover:anchor">
		<Icon
			icon={arrowSmallLeft}
			class="w-6 h-6" />
		Back
	</a>
	<FormHeader />
	<hr />
	<OAuthForm />
	<Divider label="Or" />
	<SignInForm {form} />
	<hr />
	<div class="p-4 flex flex-row gap-2 items-center justify-center">
		<p>You don't have account?</p>
		<a
			href="/sign-up"
			class="flex flex-row items-center hover:anchor text-primary-400-500-token">
			Sign up
		</a>
	</div>
</div>
