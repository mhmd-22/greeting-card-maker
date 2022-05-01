<script>
	export let shown = false;
	export let title = '';
</script>

{#if shown}
	<div class="absolute left-0 top-0 flex justify-center items-center w-full h-full bg-black/50">
		<div class="bg-white rounded-md p-4 lg:min-w-[25%] min-w-[75%]">
			<header class="flex justify-between my-1">
				<h1 class="font-black text-lg">{title}</h1>
				<button
					class="font-mono bg-transparent hover:bg-transparent text-primary-4 px-0"
					on:click={() => (shown = false)}>×</button
				>
			</header>
			<!-- <p class="my-4 text-right">رسالة</p> -->
			<slot />
			<footer class="flex justify-start">
				<button on:click on:click={() => (shown = false)}>موافق</button>
			</footer>
		</div>
	</div>
{/if}
