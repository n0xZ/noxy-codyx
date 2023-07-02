<script lang="ts">
		import { signOut } from '@auth/sveltekit/client';
	import { env } from '$env/dynamic/public';


	import MobileHomeMenu from "$lib/components/menu/home.svelte"
	const callbackUrl = env.PUBLIC_AUTH_ORIGIN_URL;
</script>

<header class="p-4 ">
	<nav
		class="flex flex-row items-center justify-between container mx-auto max-w-4xl xl:text-lg text-base  "
	>
		<h1>
			<a href="/home" class="no-underline text-rose-500  font-semibold"> Codyx </a>
		</h1>
		<ul class="xl:flex hidden flex-row items-center space-x-4  ">
			<a href="/home/recommendations/create">Crear nueva recomendación</a>
			
				<button
					type="submit"
					class="p-3 rounded-lg bg-rose-500 text-gray-50 font-semibold "
					on:click={() => signOut({ redirect: true, callbackUrl })}

					>Cerrar sesión</button
				>

		</ul>
		<MobileHomeMenu />
	</nav>
</header>
<div class="h-full mt-4"><slot /></div>
