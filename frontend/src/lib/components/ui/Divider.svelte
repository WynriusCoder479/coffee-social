<script lang="ts">
	export let label: string
</script>

<div class="inline-flex items-center justify-center w-full">
	<hr class="w-full border-t-2" />
	<span
		class="absolute px-2 ring-1 ring-surface-300-600-token rounded-token font-medium -translate-x-1/2 bg-surface-100-800-token">
		{label}
	</span>
</div>
