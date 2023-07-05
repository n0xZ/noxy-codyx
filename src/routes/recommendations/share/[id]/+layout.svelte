<script lang="ts">
	import type { LayoutServerData } from './$types'

	export let data: LayoutServerData
</script>
<svelte:head>
{#if data.isAuth}
	<title>Codyx | Preview de mi lista de recomendaciones</title>
{:else}
	<title>Bienvenido a Noxy - codyx!</title>
{/if}
</svelte:head>
<header class="p-6">
	<nav
		class="flex flex-row items-center justify-between container mx-auto max-w-4xl xl:text-lg text-base"
	>
		<h1>
			<a
				href="/"
				class="font-bold"
				>Codyx</a
			>
		</h1>
		<ul class="flex flex-row items-center space-x-4 opacity-90">
			<li>
				{#if !data.isAuth}
					<a href="/login" class="hover:underline"  data-sveltekit-preload-data="hover"> Iniciar sesión </a>
				{:else}
					<a href="/home"  class="hover:underline" data-sveltekit-preload-data="hover"> Volver al Home </a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<slot/>