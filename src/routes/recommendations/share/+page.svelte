<script lang="ts">
	import type { PageServerData } from './$types'
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/ui/avatar'
	import RecommendationList from '$lib/components/recommendation/recommendation-list.svelte'
	export let data: PageServerData
const fallbackUsername  = data.user.name?.slice(0, 2)
</script>

<main class="h-full container mx-auto max-w-4xl">
<aside class="p-5  flex flex-row items-center justify-center space-x-2">
	<Avatar>
		<AvatarImage
			src={data.user.image ?? ""}
			alt={`Imagen de ${data.user.name}`}
		/>
		<AvatarFallback>{fallbackUsername}</AvatarFallback>
	</Avatar>
  <p  class="font-medium">{data.user.name}</p >
</aside>
	<RecommendationList props={{ reccos: data.user.recommendations }} />
</main>
