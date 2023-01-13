<script lang="ts">
import type {Recommendation} from '@prisma/client'
type RecommendationListProps={
   reccos:Recommendation[]
}
export let props:RecommendationListProps
</script>


{#each props.reccos as {name,gender,note,imgSrc} }
   <article class="flex flex-col justify-center items-center rounded-md   space-y-3 border-2 border-rose-200 p-2 text-center h-96 w-60">
   <h2 class="font-semibold text-xl">{name}</h2>
   <img src={imgSrc} width="150" height="150"  class="rounded-lg aspect-a" alt={`Imagen de ${name}`}>
   <p class=" w-full">{gender}</p>
   <p class="font-light text-xs c-gray-500">{note}</p>
   </article>
{/each}