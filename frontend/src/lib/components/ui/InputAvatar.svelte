<script lang="ts">
	import Icon from '@iconify/svelte'
	import cameraPlus from '@iconify/icons-tabler/camera-plus'

	export let label: string
	export let name: string

	$: imageSrc = ''

	const onPreviewImage = (e: Event) => {
		const target = e.target as HTMLInputElement

		const files = target.files

		if (files && files.length > 0) {
			imageSrc = URL.createObjectURL(files[0])
		}
	}
</script>

<label class="label w-fit cursor-pointer">
	<span class="ml-4">{label}</span>
	<div
		class="w-32 h-32 overflow-hidden rounded-full border-4 border-primary-200-700-token">
		{#if imageSrc === ''}
			<div class="w-full h-full flex items-center justify-center">
				<Icon
					icon={cameraPlus}
					class="w-10 h-10" />
			</div>
		{:else}
			<img
				src={imageSrc}
				alt="Avatar"
				class="w-full h-full"
				id="image-avater" />
		{/if}
	</div>
	<input
		type="file"
		{name}
		accept="image/*"
		value=""
		hidden
		on:change={onPreviewImage} />
</label>
