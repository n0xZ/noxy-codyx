<script lang="ts">
	import type { Recommendation } from '@prisma/client'
	import {enhance} from '$app/forms'
	import Edit from '../icons/edit.svelte'
	import Delete from '../icons/delete.svelte'

	type RecommendationListProps = {
		reccos: Recommendation[]
	}
	export let props: RecommendationListProps
</script>

{#each props.reccos as { name, genre, note, imgSrc, rating,id }}
	<article
		class="flex flex-col justify-center items-center rounded-md    shadow-md bg-light-50  text-center h-auto w-72"
	>
	
		<img
			src={imgSrc}
			width="288"
			height="200"
			class="rounded-sm aspect-a"
			alt={`Imagen de ${name}`}
		/>
		<p class=" w-full text-lg bg-amber-400 c-light  font-medium">{genre}</p>
			<h2 class="font-semibold text-xl mb-3">{name}</h2>
		<p class=" text-md  c-gray-400">"{note}"</p>
		{#if rating}
			<p class="text-xs c-gray-400">{rating}/10</p>
		{/if}
		<aside
			class="flex flex-row items-center space-x-5 justify-center pb-4 h-full w-full mt-10"
		>
			<a title="Editar recomendación" href={`/home/recommendations/edit/${id}`}
				><Edit iconClass="h-6 w-6 hover:c-rose-400 duration-100 ease-in-out" /></a
			>
			<form
			use:enhance
      enctype="multipart/form-data"
				class="flex flex-row items-center "
				action="/home?/delete-recommendation"
				method="post"
			>
			<input type="hidden" name="id" value={id}>
				<button  type="submit" title="Eliminar recomendación"><Delete iconClass="h-6 w-6 hover:c-rose-400 duration-100 ease-in-out" /></button>
			</form>
		</aside>
	</article>
{/each}
