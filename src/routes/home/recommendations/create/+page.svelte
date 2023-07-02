<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit'
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	import Spinner from '$lib/components/icons/spinner.svelte'
	import Input from '$lib/ui/input.svelte'
	import Label from '$lib/ui/label.svelte'
	import Button from '$lib/ui/button.svelte'

	const actualGenres = ['MOVIE', 'SERIE', 'ANIME', 'MANGA', 'NOVEL', 'OTHER']

	export let form: ActionData
	let loading = false
	const createRecommendation: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			await update()
		}
	}
</script>

<svelte:head><title>Codyx - Crear nueva recomendación</title></svelte:head>

<section class="container w-full h-screen max-w-4xl mx-auto mt-5">
	<form
		action="/home/recommendations/create?/create-recommendation"
		enctype="multipart/form-data"
		use:enhance={createRecommendation}
		method="post"
			class="container  h-screen   flex flex-col justify-center space-y-3 w-full"
	>
		<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center mb-3">Crea tu nueva recomendación!</h2>
		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
			<Label for="name">Nombre de la recomendación</Label>
			<Input
				type="text"
				name="name"
				placeholder="'The Lord of the Rings: The Two Towers'"
				class="max-w-4xl"
			/>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.fields?.name}
					<p>{form?.fields?.name}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
			<Label for="note">Nota de la recomendación</Label>
			<Input
				type="text"
				name="note"
				disabled={loading}
				placeholder="'Está muy bien este ejemplo. Pero lo miraré más adelante...'"
			/>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.fields?.note}
					<p>{form?.fields?.note}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
			<Label for="genre">Género de la recomendación</Label>
			<select
				name="genre"
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
			<aside class="flex flex-col justify-center space-y-3 max-w-4xl">
				<Label for="img"
					>Imagen/Preview de la recomendación (Preferiblemente URL)</Label
				>

				<Input
					type="file"
					name="img"
					disabled={loading}
					placeholder="ingresa tu imagen acá"
					class="px-4 py-3 rounded-lg outline-none  bg-light-300 text-gray-800 max-w-4xl"
					accept=".jpg, .jpeg, .png, .webp"
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
				>{#if loading}
					<Spinner />
					<span>Cargando...</span>
				{:else}
					Crear nueva recomendación
				{/if}
			</Button>
			<span class="h-5 text-xs text-red-500"
				>{#if form?.containsErrors && form?.externalErrors}
					<p>{form?.externalErrors}</p>
				{/if}
			</span>
		</aside>
	</form>
</section>
