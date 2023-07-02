<script lang="ts">
 import type {PageServerData } from "./$types"
import RecommendationList from "$lib/components/recommendation/recommendation-list.svelte";


export let data :PageServerData

</script>
<svelte:head>
<title>Codyx - Home</title>
</svelte:head>

<h2 class="mt-4 text-center font-bold text-2xl ">Mi lista actual de recomendaciones</h2>

{#if data.reccos.length!==0}
<section class="h-full container mx-auto max-w-4xl   grid xl:grid-cols-3  grid-cols-1 grid-rows-2 gap-5  place-items-center 	mt-9  font-mukta">

	<RecommendationList props={{reccos:data.reccos}}  />
	</section>
	{:else }
	<article class="h-full grid place-items-center"><p class="text-center ">Al parecer no tienes recomendados creados hasta ahora. Puedes crearlos haciendo <a class="underline" href="/home/recommendations/create">click aquí</a></p></article>
{/if}
