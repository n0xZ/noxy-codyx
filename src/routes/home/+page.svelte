<script lang="ts">
	import { browser } from '$app/environment'
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import type { ActionData, PageServerData } from './$types'
	import Button from '$lib/ui/button.svelte'
	import {
		AlertDialog,
		AlertDialogTrigger,
	} from '$lib/ui/alert-dialog'
	import RecommendationList from '$lib/components/recommendation/recommendation-list.svelte'
	import UpdateShareForm from '$lib/components/alert-dialog/update-share-form.svelte'
	import DisplayShareLink from '$lib/components/alert-dialog/display-share-link.svelte'

	export let data: PageServerData
	export let form: ActionData
	$: {
		if (form?.isSucess) location.reload()
	}
</script>

<svelte:head>
	<title>Codyx - Home</title>
</svelte:head>

<aside class="p-5 border-b-2 border-primary/10">
	<div
		class="container mx-auto max-w-4xl flex items-center justify-end flex-row"
	>
		<AlertDialog>
			<AlertDialogTrigger>
				<Button variant="outline">Compartir lista 📒</Button>
			</AlertDialogTrigger>
			{#if data.userMetadata.isContentPublic}
					<DisplayShareLink id={data.userMetadata.id} />
			{:else}
			<UpdateShareForm />
			
			{/if}
		</AlertDialog>
	</div>
</aside>
<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center mt-2">
	Mi lista actual de recomendaciones
</h2>
{#if data.reccos.length !== 0}
	<section
		class="h-full container mx-auto max-w-4xl grid xl:grid-cols-3 grid-cols-1 grid-rows-2 gap-5 place-items-center mt-9 "
	>
		<RecommendationList props={{ reccos: data.reccos }} />
	</section>
{:else}
	<article class="h-full grid place-items-center">
		<p class="text-center">
			Al parecer no tienes recomendados creados hasta ahora. Puedes crearlos
			haciendo <a class="underline" href="/home/recommendations/create"
				>click aquí</a
			>
		</p>
	</article>
{/if}

{#if browser}
	<SvelteToast />
{/if}