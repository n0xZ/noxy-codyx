<script lang="ts">
	import type { PageServerData } from './$types'
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/ui/avatar'
	import RecommendationList from '$lib/components/recommendation/recommendation-list.svelte'
	export let data: PageServerData
	const fallbackUsername = data.user.name?.slice(0, 2)
</script>

<main class="h-full container mx-auto max-w-5xl">
<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
>Lista de recomendaciones</h2>
	<aside class="p-5 flex flex-row items-center justify-center space-x-2 mb-6">
		<Avatar>
			<AvatarImage
				src={data.user.image ?? ''}
				alt={`Imagen de ${data.user.name}`}
			/>
			<AvatarFallback>{fallbackUsername}</AvatarFallback>
		</Avatar>
		<p class="font-medium">Creado por {data.user.name}</p>
	</aside>
	<section class="w-full grid">
		<RecommendationList props={{ reccos: data.user.recommendations }} />
	</section>
</main>
