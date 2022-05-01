<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	export let onSelect: (url: string) => any = () => {};

	let url = '';
</script>

<div class="space-y-5 flex flex-col">
	<label class="text-center text-lg">
		<span class="block mb-5 text-xl"
			>ارفع صورة بطاقة التهنئة على مواقع الرفع السريعة وانسخ الرابط هنا</span
		>
		<input
			dir="ltr"
			class="text-center"
			type="url"
			required
			bind:value={url}
			placeholder="www.example.com/example.jpg"
		/>
	</label>
	<button class="self-center" disabled={!url} on:click={() => onSelect(url)}>التالي</button>
</div>

<Modal />
