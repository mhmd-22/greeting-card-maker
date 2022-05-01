<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	let listOfNames = '';
	let uploadType = 0;

	let files: FileList;

	let value = '';

	export let shown = false;

	$: if (files && files[0]) {
		const reader = new FileReader();
		reader.readAsText(files[0]);
		reader.onload = () => {
			value = reader.result as string;
		};
	}

	export let onUpload: (value: string) => void;
</script>

<Modal bind:shown title="رفع قائمة من الأسماء" on:click={() => onUpload?.(value)}>
	<div class="flex flex-col">
		<div class="flex flex-row">
			<label class="ml-2">
				<input type="radio" name="upload-option" value={0} bind:group={uploadType} />
				<span />
			</label>
			<textarea
				class="flex-1"
				bind:value
				placeholder={'الاسم الأول\nالأسم الثاني '}
				disabled={uploadType != 0}
			/>
		</div>
		<div class="flex flex-row items-center mb-5">
			<label>
				<input type="radio" name="upload-option" value={1} bind:group={uploadType} />
				<span>من ملف</span>
			</label>
			<input
				bind:files
				accept="text/plain"
				class="flex-1 mr-5"
				type="file"
				disabled={uploadType != 1}
			/>
		</div>
	</div>
</Modal>
