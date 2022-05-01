<script lang="ts">
</script>

<div dir="ltr">
	<slot />
</div>

<style>
	div {
		display: flex;
	}

	div > :global(button:first-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	div > :global(button:last-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	div > :global(button:not(:first-child, :last-child)) {
		border-radius: 0;
	}
</style>
