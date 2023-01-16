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

{#each props.reccos as { name, genre, note, imgSrc, id }}
	<article
		class="flex flex-col justify-center items-center rounded-md   space-y-3 border-2 border-rose-200 p-2 text-center h-auto w-72"
	>
		<h2 class="font-semibold text-xl">{name}</h2>
		<img
			src={imgSrc}
			width="150"
			height="150"
			class="rounded-lg aspect-a"
			alt={`Imagen de ${name}`}
		/>
		<p class=" w-full">{genre}</p>
		<p class="font-light text-xs c-gray-500">{note}</p>
		<aside
			class="flex flex-row items-center space-x-5 justify-center pb-4 h-full w-full"
		>
			<a title="Editar recomendación" href={`/home/recommendations/edit/${id}`}
				><Edit iconClass="h-7 w-7" /></a
			>
			<form
			use:enhance
      enctype="multipart/form-data"
				class="flex flex-row items-center "
				action="/home?/delete-recommendation"
				method="post"
			>
			<input type="hidden" name="id" value={id}>
				<button  type="submit"><Delete iconClass="h-7 w-7" /></button>
			</form>
		</aside>
	</article>
{/each}
