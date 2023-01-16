<script lang="ts">
	import { Genre } from '@prisma/client'
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	const actualGenres = Object.keys(Genre)
	export let form: ActionData
</script>

<svelte:head><title>Codyx - Crear nueva recomendación</title></svelte:head>

<section class="h-screen grid place-items-center font-mukta">
	<form
		action="/home/recommendations/create?/create-recommendation"
		use:enhance
		method="post"
		class=" flex flex-col justify-center space-y-6 max-w-2xl w-full xl:p-0 p-1"
	>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="name" class="font-semibold">Nombre de la recomendación</label>
			<input
				type="text"
				name="name"
				placeholder="'The Lord of the Rings: The Two Towers'"
				class="px-4 py-3 rounded-lg outline-none border-2 border-rose-200 c-gray-800 max-w-2xl"
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
				placeholder="'Está muy bien este ejemplo. Pero lo miraré más adelante...'"
				class="px-4 py-3 rounded-lg outline-none border-2 border-rose-200 c-gray-800 max-w-2xl"
			/>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.fields?.note}
					<p>{form?.fields?.note}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="" class="font-semibold">Género de la recomendación</label>
			<select
				name="genre"
				class="px-4 py-3 rounded-lg outline-none border-2 border-rose-200 c-gray-800 max-w-2xl"
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
				<label for="password" class="font-semibold"
					>Imagen/Preview de la recomendación (Preferiblemente URL)</label
				>

				<input
					type="text"
					name="imgSrc"
					placeholder="https://janedoereccomendationimage.jpeg"
					class="px-4 py-3 rounded-lg outline-none  border-2 border-rose-200 c-gray-800 max-w-2xl"
				/>
				<span class="h-5 c-red-500"
					>{#if form?.containsErrors && form?.fields?.imgSrc}
						<p>{form?.fields?.imgSrc}</p>
					{/if}
				</span>
			</aside>
			<button
				type="submit"
				class="px-5 py-3 rounded-lg  bg-rose-500 c-gray-50 font-semibold w-full max-w-2xl"
				>Crear nueva recomendación</button
			>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.externalErrors}
					<p>{form?.externalErrors}</p>
				{/if}
			</span>
		</aside>
	</form>
</section>
