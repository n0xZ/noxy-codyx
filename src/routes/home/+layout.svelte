<script lang="ts">
	import { enhance } from '$app/forms'
	import MobileHomeMenu from "$lib/components/menu/home.svelte"
</script>

<header class="p-4 ">
	<nav
		class="flex flex-row items-center justify-between container mx-auto max-w-4xl xl:text-lg text-base font-normal font-commissioner "
	>
		<h1>
			<a href="/home" class="no-underline c-rose-500  font-semibold"> Codyx </a>
		</h1>
		<ul class="xl:flex hidden flex-row items-center space-x-4  ">
			<a href="/home/recommendations/create">Crear nueva recomendación</a>
			<form method="post" use:enhance action="/home?/logout">
				<button
					type="submit"
					class="p-3 rounded-lg bg-rose-500 c-gray-50 font-semibold "
					>Cerrar sesión</button
				>
			</form>
		</ul>
		<MobileHomeMenu />
	</nav>
</header>
<div class="h-full mt-4"><slot /></div>
