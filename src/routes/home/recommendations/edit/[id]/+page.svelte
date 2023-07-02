<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit'
	import { Status } from '@prisma/client'
	import { enhance } from '$app/forms'
	import {page } from '$app/stores'
 import Spinner from '$lib/components/icons/spinner.svelte'
	import Input from '$lib/ui/input.svelte'
	import Label from '$lib/ui/label.svelte'
	import Button from '$lib/ui/button.svelte'
	import type { ActionData, PageServerData } from './$types'

	const actualGenres =["MOVIE" , "SERIE" , "ANIME" , "MANGA" , "NOVEL" , "OTHER"]
	const actualStatus = Object.keys(Status)
	let loading = false
	const id = $page.params.id
	export let form: ActionData
	export let data: PageServerData

	const updateRecommendation:SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			await update()
		}
	}
</script>

<svelte:head><title>Codyx - Editar recomendación existente</title></svelte:head>

<section class="container w-full h-screen max-w-4xl mx-auto mt-5">
	<form
		action={`/home/recommendations/edit/${id}?/edit-recommendation`}
		use:enhance={updateRecommendation}
		method="post"
		class="container  h-screen   flex flex-col justify-center space-y-3 w-full"
	>
		<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center mb-3">Editar recomendación</h2>
		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
			<Label for="name" >Nombre de la recomendación</Label>
			<Input
				type="text"
				name="name"
				value={data.form?.name}
				disabled={loading}
				placeholder="'The Lord of the Rings: The Two Towers'"

			/>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.fields?.name}
					<p>{form?.fields?.name}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
			<Label for="note" >Nota de la recomendación</Label>
			<Input
				type="text"
				name="note"
				value={data.form?.note}
				disabled={loading}
				placeholder="'Está muy bien este ejemplo. Pero lo miraré más adelante...'"
				class="px-4 py-3 rounded-lg outline-none bg-light-300 c-gray-800 max-w-4xl"
			/>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.fields?.note}
					<p>{form?.fields?.note}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
			<Label for="genre" >Género de la recomendación</Label>
			<select
				name="genre"
				value={data.form.genre}
				disabled={loading}
class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#each actualGenres as genre}
					<option value={genre}>
						{genre}
					</option>
				{/each}
			</select>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.fields?.genre}
					<p>{form?.fields?.genre}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
			<Label for="rating" 
				>Puntaje de la recomendación (del 1 al 10)</Label
			>
			<input
				type="number"
				name="rating"
				value={data.form?.rating && ''}
				disabled={loading}
				placeholder="Por ej. 6"
class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			/>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.fields?.rating}
					<p>{form?.fields?.rating}</p>
				{/if}</span
			>
		</aside>


			<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
				<Label for="status" 
					>Estado actual de la recomendación
				</Label>
				<select
					name="status"
					value={data.form?.status}
					disabled={loading}
			class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#each actualStatus as status}
						<option value={status}>
							{status}
						</option>
					{/each}
				</select>
				<span class="h-5 text-xs text-red-500"
					>{#if form?.containsErrors && form?.fields?.status}
						<p>{form?.fields?.status}</p>
					{/if}</span
				>
			</aside>
			
		
			

		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
				<Label for="img" 
					>Imagen/Preview de la recomendación</Label
				>

				<input
					type="file"
					name="img"
					
					disabled={loading}
					
				
				/>
				<span class="h-5 text-xs text-red-500"
					>{#if form?.containsErrors && form?.fields?.img}
						<p>{form?.fields?.img}</p>
					{/if}
				</span>
			</aside>
				<Button
				type="submit"
				disabled={loading}
	 class="flex flex-row items-center space-x-2"		
  				>
				{#if loading}
					<Spinner />
					<span>Editando...</span>
				{:else}
					Editar recomendación
				{/if}
				
				</Button
			>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.externalErrors}
					<p>{form?.externalErrors}</p>
				{/if}
			</span>
	</form>
</section>
