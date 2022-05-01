<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async function ({ url, fetch, session, stuff }) {
		return {
			redirect: '/create',
			status: 302,
			props: {}
		};
	};
	import { browser } from '$app/env';
</script>
