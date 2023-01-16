<script lang="ts">
 import type { PageData, PageServerData } from "./$types"
import {enhance} from '$app/forms'
import RecommendationList from "$lib/components/recommendation-list.svelte";


export let data :PageServerData

</script>
<svelte:head>
<title>Codyx - Home</title>
</svelte:head>

<h2 class="mt-6 text-center font-bold text-2xl font-mukta">Mi lista actual de recomendaciones</h2>
<section class="h-full container mx-auto max-w-3xl   grid xl:grid-cols-6 grid-cols-1 grid-rows-2  place-items-center mt-4 font-mukta">
{#if data.reccos.length!==0}
	<RecommendationList props={{reccos:data.reccos}}/>
	{:else }
	<p>Al parecer no tienes recomendados creados hasta ahora. Puedes crearlos haciendo <a href="/home/recommendations/create">click aquí</a></p>
{/if}
</section>