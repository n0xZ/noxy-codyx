<script lang="ts">
	
	import { enhance, type SubmitFunction } from '$app/forms'
	import type { ActionData } from './$types'
	import Spinner from '$lib/components/icons/spinner.svelte'

	const actualGenres =["MOVIE" , "SERIE" , "ANIME" , "MANGA" , "NOVEL" , "OTHER"]

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

<section class="h-screen grid place-items-center font-mukta">
	<form
		action="/home/recommendations/create?/create-recommendation"
		use:enhance={createRecommendation}
		method="post"
		class=" flex flex-col justify-center space-y-6 max-w-2xl w-full xl:p-0 p-2"
	>
		<h1 class="text-center text-3xl font-semibold">Crear nueva recomendación</h1>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="name" class="font-semibold">Nombre de la recomendación</label>
			<input
				type="text"
				name="name"
				disabled={loading}
				placeholder="'The Lord of the Rings: The Two Towers'"
				class="px-4 py-3 rounded-lg outline-none bg-light-300 c-gray-800 max-w-2xl"
			/>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.fields?.name}
					<p>{form?.fields?.name}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="note" class="font-semibold">Nota de la recomendación</label>
			<input
				type="text"
				name="note"
				disabled={loading}
				placeholder="'Está muy bien este ejemplo. Pero lo miraré más adelante...'"
				class="px-4 py-3 rounded-lg outline-none bg-light-300 c-gray-800 max-w-2xl"
			/>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.fields?.note}
					<p>{form?.fields?.note}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="genre" class="font-semibold">Género de la recomendación</label>
			<select
				name="genre"
				disabled={loading}
				class="px-4 py-3 rounded-lg outline-none bg-light-300 c-gray-800 max-w-2xl"
			>
				{#each actualGenres as genre}
					<option value={genre}>
						{genre}
					</option>
				{/each}
			</select>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.fields?.genre}
					<p>{form?.fields?.genre}</p>
				{/if}</span
			>
			<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
				<label for="imgSrc" class="font-semibold"
					>Imagen/Preview de la recomendación (Preferiblemente URL)</label
				>

				<input
					type="text"
					name="imgSrc"
					disabled={loading}
					placeholder="https://janedoereccomendationimage.jpeg"
					class="px-4 py-3 rounded-lg outline-none  bg-light-300 c-gray-800 max-w-2xl"
				/>
				<span class="h-5 c-red-500"
					>{#if form?.containsErrors && form?.fields?.imgSrc}
						<p>{form?.fields?.imgSrc}</p>
					{/if}
				</span>
			</aside>
			<button
				type="submit"
				disabled={loading}
				class="px-5 py-3 rounded-lg  flex flex-row items-center justify-center space-x-2 bg-rose-500 c-gray-50 font-semibold w-full max-w-2xl"
				>{#if loading}
					<Spinner />
					<span>Cargando...</span>
				{:else}
					Crear nueva recomendación
				{/if}
			</button>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.externalErrors}
					<p>{form?.externalErrors}</p>
				{/if}
			</span>
		</aside>
	</form>
</section>
