<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/ui/button.svelte';

	const reloadPage = () =>location.reload()
</script>

<section class="h-screen  flex flex-col justify-center items-center space-y-2">
	<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Ups! Al parecer ocurrió un error. No te preocupes, ya estoy trabajando en ello. 😀</h2>
	<p>{$page.error?.message}</p>
<Button on:click={reloadPage}>Refrescar página</Button>
</section>
