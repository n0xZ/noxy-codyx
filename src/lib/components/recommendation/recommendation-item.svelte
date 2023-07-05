<script lang="ts">
	import type { Recommendation } from '@prisma/client'
	import { FileSignature, FileX2 } from 'lucide-svelte'
	import {page} from '$app/stores'
	import { enhance } from '$app/forms'
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from '$lib/ui/card'
	import Button from '$lib/ui/button.svelte'

	interface RecommendationWithImage extends Recommendation {
		img?: any
	}

 let isPublic = $page.url.pathname.includes("/recommendations/share")
	console.log(
isPublic
	)
	function handleGenreTextColor(genre: string) {
		switch (genre) {
			case 'MANGA':
				return 'text-amber-400'

			case 'ANIME':
				return 'text-sky-400'

			case 'MOVIE':
				return 'text-emerald-400'

			case 'NOVEL':
				return 'text-rose-400'

			case 'SERIE':
				return 'text-purple-400'

			default:
				return 'text-gray-400'
		}
	}

	export let recommendation: RecommendationWithImage
</script>

<Card class="w-[20rem] ">
	<CardHeader class="gap-2">
		<CardTitle tag="h1">
			<span>{recommendation.name} </span>
		</CardTitle>
		<CardTitle tag="h2" class="flex flex-row items-center justify-between text-sm">
		<span class={handleGenreTextColor(recommendation.genre)}>{recommendation.genre}</span>
			{#if recommendation.rating}
		<span>{recommendation.rating}/10</span>
		{/if}
			
		</CardTitle>
		<CardDescription>
			{recommendation.note}
		</CardDescription>
	</CardHeader>
	<CardContent>
		<img
			src={recommendation.img.src}
			width="288"
			height="200"
			class="rounded-sm aspect-auto"
			alt={`Imagen de ${recommendation.name}`}
		/>
	
	</CardContent>
	{#if !isPublic}
	<CardFooter class="grid gap-2">
		<Button>
			<a
				title="Editar recomendación"
				href={`/home/recommendations/edit/${recommendation.id}`}
				class="flex flex-row items-center space-x-2"
				><FileSignature class="h-4 w-4" />
				<span>Editar</span>
			</a>
		</Button>
		<form
			use:enhance
			enctype="multipart/form-data"
			class=" w-full"
			action="/home?/delete-recommendation"
			method="post"
		>
			<input type="hidden" name="id" value={recommendation.id} />
			<Button
				type="submit"
				title="Eliminar recomendación"
				class="flex flex-row justify-center items-center space-x-1 w-full"
				variant="destructive"
			>
				<FileX2 class="h-4 w-4" />
				<span class="text-center">Eliminar</span>
			</Button>
		</form>
	</CardFooter>
	{ /if}
</Card>
