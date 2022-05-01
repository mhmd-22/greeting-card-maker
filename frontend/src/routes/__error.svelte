<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script>
	import { dev } from '$app/env';

	/** @type {number} */
	export let status;
	/** @type {Error & {frame?: string} & {loc?: object}} */
	export let error;
</script>

<div class="flex flex-col items-center lg:my-12">
	<h1 class="text-center text-3xl mb-4">{status}</h1>

	<h2 class="text-xl font-medium">{error.message}</h2>

	{#if dev}
		{#if error.frame}
			<pre>{error.frame}</pre>
		{/if}
		{#if error.stack}
			<pre>{error.stack}</pre>
		{/if}
	{/if}
</div>

<style>
	pre {
		@apply max-w-full;
		direction: ltr;
	}
</style>
