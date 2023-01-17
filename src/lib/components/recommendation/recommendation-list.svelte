<script lang="ts">
	import type {Recommendation } from '@prisma/client'
	import { enhance } from '$app/forms'
	import Edit from '../icons/edit.svelte'
	import Delete from '../icons/delete.svelte'
 import RecommendationItem from './recommendation-item.svelte'

	type RecommendationListProps = {
		reccos: Recommendation[]
	}
	export let props: RecommendationListProps

</script>

{#each props.reccos as recomm}
	<RecommendationItem recommendation={recomm}/>
	{/each}
