<script lang="ts">
	import { onMount, tick } from 'svelte';

	let fonts = [];
	let error;
	let loader: typeof import('webfontloader');

	let index = 0;

	type Font = [string, string[]];
	let value: Font;

	export let onSelect: ((font: Font) => void) | undefined;

	onMount(async () => {
		try {
			loader = await import('webfontloader');
			fonts = await fetch('/fonts.json').then((res) => res.json());
		} catch (e) {
			error = e;
		}
	});

	$: value = fonts[index];

	async function onLoad() {
		onSelect?.(value);
		await tick();
	}

	$: if (loader && value) {
		loader.load({
			active() {
				onLoad();
			},
			google: {
				families: [value[0]]
			}
		});
	}
</script>

{#if fonts.length}
	<select class="" bind:value={index}>
		{#each fonts as font, i}
			<option value={i}> {font[0]}</option>
		{/each}
	</select>
{:else if error}
	<p class="text-red-600">لم نتمكن من تحميل الخطوط</p>
{:else}
	<p>Loading fonts...</p>
{/if}
