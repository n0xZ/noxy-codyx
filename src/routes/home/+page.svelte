<script lang="ts">
 import type { PageData, PageServerData } from "./$types"
import {enhance} from '$app/forms'
import RecommendationList from "$lib/components/recommendation-list.svelte";
 import type { Recommendation } from "@prisma/client"

export let data :PageServerData

</script>
<svelte:head>
<title>Codyx - Home</title>
</svelte:head>
<header class="p-4 border-b-2 border-rose-200">
	<nav
		class="flex flex-row items-center justify-between container mx-auto max-w-5xl xl:text-lg text-base font-normal font-commissioner "
	>
		<h1>
			<a href="/home" class="no-underline c-rose-500  font-semibold"> Codyx </a>
		</h1>
		<ul class="xl:flex hidden flex-row items-center space-x-4  ">
			<form method="post" use:enhance  action="/home?/logout">
				<button type="submit" class="p-3 rounded-lg bg-rose-500 c-gray-50 font-semibold ">Cerrar sesión</button>
			</form>
		</ul>
	</nav>
</header>
<h2 class="mt-6 text-center font-bold text-2xl font-mukta">Mi lista actual de recomendaciones</h2>
<section class="h-full  container mx-auto grid grid-cols-6 grid-rows-2s  mt-4 font-mukta">
 <RecommendationList props={{reccos:data.reccos}}/>
</section>