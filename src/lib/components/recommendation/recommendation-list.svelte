<script lang="ts">
	import type { Recommendation } from '@prisma/client'

	import RecommendationItem from './recommendation-item.svelte'
	interface RecommendationWithImage extends Recommendation {
		img?: any
	}
	type RecommendationListProps = {
		reccos: RecommendationWithImage[]
	}
	export let props: RecommendationListProps
</script>

{#each props.reccos as recomm}
	<RecommendationItem recommendation={recomm} />
{/each}
