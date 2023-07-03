<script lang="ts">
	import { signOut } from '@auth/sveltekit/client'
	import { env } from '$env/dynamic/public';
	const callbackUrl = env.PUBLIC_AUTH_ORIGIN_URL;
	import MobileHomeMenu from '$lib/components/menu/home.svelte'

	const signOutUser = () => signOut({redirect:false,callbackUrl})
</script>

<header class="p-5 w-full">
	<nav
		class="flex flex-row items-center justify-between container w-full mx-auto max-w-4xl text-base"
	>
		<h1>
			<a href="/home" class="no-underline text-rose-500 font-semibold"> Codyx </a>
		</h1>
		<ul class="xl:flex hidden flex-row items-center space-x-4 opacity-70">
			<a href="/home/recommendations/create">Crear nueva recomendación</a>

			<button
				type="button"
				class="rounded-lg p-3 bg-rose-500 text-gray-50 font-semibold"
				on:click={signOutUser}>Cerrar sesión</button
			>
		</ul>
		<MobileHomeMenu />
	</nav>
</header>
<div class="h-full mt-4"><slot /></div>
