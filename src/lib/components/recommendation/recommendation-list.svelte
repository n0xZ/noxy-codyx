<script lang="ts">
	import type {Image, Recommendation } from '@prisma/client'

 import RecommendationItem from './recommendation-item.svelte'
interface RecommendationWithImage extends Recommendation{
	img?: Image
}
	type RecommendationListProps = {
		reccos: RecommendationWithImage[]
	}
	export let props: RecommendationListProps

</script>

{#each props.reccos as recomm}
	<RecommendationItem recommendation={recomm}/>
	{/each}
