<script lang="ts">
	import type { Recommendation } from '@prisma/client'
	import { enhance } from '$app/forms'
	import Edit from '../icons/edit.svelte'
	import Delete from '../icons/delete.svelte'


	function handleGenreBackgroundColor (genre: string)  {
		
		switch (genre) {
			case 'MANGA':
				return 'bg-amber-400'
				break
			case 'ANIME':
				return 'bg-sky-400'
				break
			case 'MOVIE':
				return 'bg-emerald-400'
				break
			case 'NOVEL':
				return 'bg-rose-400'
				break
			case 'SERIE':
				return 'bg-purple-400'
				break
			default:
				return 'bg-gray-400'
				break
		}
	}
 

export let recommendation :Recommendation

const genreBgColor = handleGenreBackgroundColor(recommendation.genre)

</script>

<article
		class="flex flex-col justify-center items-center rounded-md    shadow-md bg-light-50  text-center h-auto w-72"
	>
		<img
			src={recommendation.imgSrc}
			width="288"
			height="200"
			class="rounded-sm aspect-a"
			alt={`Imagen de ${recommendation.name}`}
		/>
		<p class={`    w-full text-lg ${genreBgColor} c-light  font-medium p-1 mb-4 `}>
			{recommendation.genre}
		</p>
		<h2 class="font-semibold text-xl mb-3">{recommendation.name}</h2>
		<p class=" text-md  c-gray-400">"{recommendation.note}"</p>
		{#if recommendation.rating}
			<p class="text-xs c-gray-400">{recommendation.rating}/10</p>
		{/if}
		<aside
			class="flex flex-row justify-center items-center space-x-6 justify-center pb-4 h-full w-full mt-10 c-gray-600"
		>
			<a
				title="Editar recomendación"
				href={`/home/recommendations/edit/${recommendation.id}`    }
				class="flex flex-col justify-center items-center space-y-2"
				><Edit iconClass="h-6 w-6 hover:c-rose-400 duration-100 ease-in-out" />
				<span>Editar</span>
			</a>
			<form
				use:enhance
				enctype="multipart/form-data"
				class="flex flex-row items-center "
				action="/home?/delete-recommendation"
				method="post"
			>
				<input type="hidden" name="id" value={recommendation.id} />
				<button
					type="submit"
					title="Eliminar recomendación"
					class="flex flex-col justify-center items-center space-y-2"
				>
					<Delete iconClass="h-6 w-6 hover:c-rose-400 duration-100 ease-in-out" />
					<span>Eliminar</span>
				</button>
			</form>
		</aside>
	</article>
