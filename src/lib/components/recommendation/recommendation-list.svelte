<script lang="ts">
	import type {Recommendation } from '@prisma/client'

 import RecommendationItem from './recommendation-item.svelte'

	type RecommendationListProps = {
		reccos: Recommendation[]
	}
	export let props: RecommendationListProps

</script>

{#each props.reccos as recomm}
	<RecommendationItem recommendation={recomm}/>
	{/each}
