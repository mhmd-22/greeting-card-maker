<script lang="ts">
	import { browser } from '$app/env';
	import { API_URL } from '$lib/api';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import FontSelector from '$lib/components/FontSelector.svelte';
	import { defaultText, generateImage, renderImage } from '$lib/text';
	import { enableDragEvents } from 'ezgesture';
	import { onMount, tick } from 'svelte';

	export let url = '';
	export let onFail: () => void;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let img: HTMLImageElement;
	let text = { ...defaultText };
	let render: () => void;

	onMount(async () => {
		enableDragEvents(canvas);
		canvas.addEventListener('ezgdragstart', onDragStart);
		canvas.addEventListener('ezgdragmove', onDragMove);
		canvas.addEventListener('click', onClick);
		img = await generateImage(url);
		canvas.width = img.width;
		canvas.height = img.height;
		ctx = canvas.getContext('2d')!;

		ctx.imageSmoothingEnabled = false;

		render = () => {
			renderImage(ctx, text, img, true);
		};

		render();
	});

	function onClick(e: MouseEvent) {}

	function onDragStart(e: EZGDragEvent) {}
	function onDragMove(e: EZGDragEvent) {
		const { movementX, movementY, originalEvent } = e.detail;
		originalEvent.preventDefault();
		const rect = canvas.getBoundingClientRect();
		text.x += movementX / rect.width;
		text.y += movementY / rect.height;

		render();
	}

	let saved = '';
	let error;
	let status;

	async function saveImage() {
		try {
			const res = await fetch(`${API_URL}/card`, {
				method: 'post',
				mode: 'cors',
				body: JSON.stringify({ url, ...text }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			status = res.status;

			if (!res.ok && res.status >= 400) {
				error = await res.json();
				return;
			}

			const id = await res.text();

			if (id) {
				saved = id;
			}
		} catch (err) {
			error = err;
		}
	}

	$: if (canvas && !!render && text.content) {
		render();
	}

	async function onSelectFont(font) {
		text.font = font[0];
		await tick();
		render();

		// make sure to fonts loaded correctly into canvas
		setTimeout(render, 100);
		setTimeout(render, 1000);
	}

	const textAligns = {
		left: 'يسار',
		center: 'وسط',
		right: 'يمين'
	};
</script>

{#if saved}
	<p>تم حفظ الصورة بنجاح يمكن معاينتها عبر الرابط التالي</p>
	<a dir="ltr" class="" href="/{saved}">{window.location.host}/{saved}</a>
{:else if error}
	<p>{status >= 400 ? 'يوجد خطأ في  صحة البيانات' : 'ثمة مشكلة ما'}</p>
	<pre>{error.message}</pre>
	<button on:click={onFail}>أعد المحاولة</button>
{:else}
	<canvas bind:this={canvas} />

	<div class="space-y-5 flex flex-col items-center">
		<input class="rtl:text-right" type="text" bind:value={text.content} />
		<div class="flex items-center">
			<span class="ml-4">الخط</span>
			<FontSelector onSelect={onSelectFont} />
			<input
				type="color"
				class="w-8 h-8 m-0 mr-2"
				value={text.color}
				on:change={(e) => (text.color = e.currentTarget.value)}
			/>
		</div>
		<div class="flex items-center">
			<span class="ml-4">حجم الخط</span>
			<input dir="ltr" type="range" step="0.01" min="1" max="5" bind:value={text.fontSize} />
		</div>
		<div class="flex items-center">
			<!-- <span class="ml-2">الخط</span> -->
			<ButtonGroup>
				{#each Object.entries(textAligns) as [align, content]}
					<button
						on:click={() => (text.textAlign = align)}
						class={text.textAlign == align ? 'bg-primary-4 hover:bg-primary-4' : 'secondary'}
						>{content}</button
					>
				{/each}
			</ButtonGroup>
		</div>

		<button class="" on:click={saveImage}>حفظ</button>
	</div>
{/if}

<style>
	canvas {
		max-width: 100%;
		max-height: 56vh;

		touch-action: none;
	}
</style>
