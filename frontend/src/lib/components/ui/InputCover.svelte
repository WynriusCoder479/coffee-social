<script lang="ts">
	import Icon from '@iconify/svelte'
	import cameraPlus from '@iconify/icons-tabler/camera-plus'

	export let label: string
	export let name: string

	$: imgSrc = ''

	const onPreviewImage = (event: Event) => {
		const target = event.target as HTMLInputElement

		const files = target.files

		if (files && files.length > 0) {
			imgSrc = URL.createObjectURL(files[0])
		}
	}
</script>

<label class="label w-full cursor-pointer">
	<span class="ml-4">{label}</span>
	<div class="h-32 overflow-hidden border-4 border-primary-200-700-token">
		{#if imgSrc === ''}
			<div class="w-full h-full flex items-center justify-center">
				<Icon
					icon={cameraPlus}
					class="w-10 h-10" />
			</div>
		{:else}
			<img
				src={imgSrc}
				alt="Avatar"
				class="w-full h-full"
				id="image-avatar" />
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
