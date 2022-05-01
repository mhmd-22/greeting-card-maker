<script context="module">
	export const preload = true;
</script>

<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Upload from './_stages/upload.svelte';
	import Edit from './_stages/edit.svelte';
	import MdiCandy from '~icons/mdi/candy';
	import Fa6SolidMosque from '~icons/fa6-solid/mosque';

	// let url = 'https://i.ibb.co/qRdyTXn/Untitled2.png';
	// let selected = true;
	let url = '';
	let selected = false;
</script>

<div class="flex flex-col items-center py-4">
	<h1 class="text-center text-3xl mb-4 flex flex-col items-center">
		<Fa6SolidMosque class="mb-4 text-primary-2" />
		<span class="text-gray-800">اصنع بطاقات تهنئة</span>
	</h1>

	<div class="w-full flex justify-center relative items-center mb-5">
		{#each { length: 3 } as _, i}
			<div class="relative flex justify-center items-center {i != 2 ? 'ml-[15%]' : ''}">
				<MdiCandy
					class="w-16 h-16 {(selected ? 2 : url ? 1 : 0) == i
						? 'text-primary-3'
						: 'text-primary-1'}"
				/>
				<span class="absolute text-white">{i + 1}</span>
			</div>
			<!-- <span
				class="w-5 h-5 flex items-center justify-center {(selected ? 2 : url ? 1 : 0) == i
					? 'bg-primary-3'
					: 'bg-primary-1'} {i != 2 ? 'ml-[15%]' : ''} text-white p-4 rounded-full">{i + 1}</span
			> -->
		{/each}
		<span class="absolute w-[40%] h-[2px] bg-primary-1 -z-10" />
	</div>

	{#if url}
		{#if selected}
			<Edit {url} onFail={() => (selected = false)} />
		{:else}
			<img class="" src={url} alt="" />
			<button class="my-4 secondary" on:click={() => (url = '')}>تغير الصورة</button>
			<button class="my-4" on:click={() => (selected = true)}>اختيار الصورة</button>
		{/if}
	{:else}
		<Upload onSelect={(u) => (url = u)} />
	{/if}
</div>

<style>
	img {
		max-height: 56vh;
		max-width: 100%;
	}
</style>
