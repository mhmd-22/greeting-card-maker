<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	export const load: Load = async function ({ url, fetch, session, stuff, params }) {
		const res = await fetch(`${API_URL}/card/${params.id}`);
		if (!res.ok) {
			return {
				status: 404,
				error: new Error('لم يتم إيجاد الصورة')
			};
		}
		const data = await res.json();
		return {
			props: {
				data
			}
		};
	};
</script>

<script lang="ts">
	import UploadNamesList from '$lib/components/UploadNamesList.svelte';

	import { generateImage, renderImage, type TextData } from '$lib/text';
	import Modal from '$lib/components/Modal.svelte';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';
	import { API_URL } from '$lib/api';

	export let data: TextData & { url: string };

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let img: HTMLImageElement;

	let uploadListModalOpen = false;

	// let namesList = 'الاسم 1 \n الاسم2';
	let namesList = '';

	onMount(async () => {
		img = await generateImage(data.url);

		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;

		img.onerror = (e) => {
			console.error(e);
		};

		ctx = canvas.getContext('2d')!;

		renderImage(ctx, data, img);
	});

	$: if (ctx && data.content) {
		renderImage(ctx, data, img);
	}

	let metadata:
		| {
				percent: number;
				currentFile: string;
		  }
		| undefined;

	function downloadCanvas() {
		if (namesList) {
			const zip = new JSZip();

			const names = namesList.split('\n');
			names.forEach((name, i) => {
				data.content = name;
				renderImage(ctx, data, img);
				canvas.toBlob((blob) => {
					if (!blob) return;
					zip.file(`${name}.png`, blob);

					if (i >= names.length - 1) {
						zip
							.generateAsync({ type: 'blob' }, (md) => {
								if (md.currentFile) {
									metadata = md;
								}
							})
							.then((content) => {
								metadata = undefined;
								saveAs(content, 'المعايدات.zip');
							});
					}
				});
			});

			return;
		}

		// const url = canvas.toDataURL();
		// saveAs(url, 'الصورة.png');

		canvas.toBlob((blob) => {
			if (!blob) return;
			saveAs(blob, 'الصورة.png');
		});
	}

	function onUpload(v) {
		namesList = v;
		uploadListModalOpen = false;
	}
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<div class="flex flex-col items-center lg:my-12">
	<h1 class="text-center text-3xl text-primary-4">بطاقات تهنئة</h1>

	<!-- <p>أو رفع قائمة من الأسماء</p> -->
	{#if namesList}
		<div class="mb-5">
			<span>تم رفع قائمة من الأسماء</span>
			<button
				class="font-mono bg-transparent hover:bg-transparent text-red-700 px-0"
				on:click={() => (namesList = '')}>حذف</button
			>
			{#each namesList.split('\n', 3) as name}
				<p>{name}</p>
			{/each}
			{#if namesList.split('\n').length > 3}
				<p>...</p>
			{/if}
		</div>
	{:else}
		<input class="mb-5 mt-5" type="text" bind:value={data.content} />
		<button class="mb-5" on:click={() => (uploadListModalOpen = true)}>أو قائمة من الأسماء</button>
		<UploadNamesList bind:shown={uploadListModalOpen} {onUpload} />
	{/if}
	<canvas bind:this={canvas} />
	<button disabled={!!metadata} class="mt-5 lg" on:click={downloadCanvas}>تحميل</button>
	{#if metadata}
		<p>{metadata.percent}% - {metadata.currentFile}</p>
	{/if}

	<a class="mt-10 text-center text-primary-4 underline" href="/create">اصنع بطاقتك الخاصة</a>
</div>

<style>
	canvas {
		max-height: 50vh;
		max-width: 100%;
		/* width: 100%; */
		/* height: 15%; */
	}
</style>
