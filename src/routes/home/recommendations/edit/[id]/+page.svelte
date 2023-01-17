<script lang="ts">
	import { Genre, Status } from '@prisma/client'
	import { enhance } from '$app/forms'

	import type { ActionData, PageServerData } from './$types'

	const actualGenres =Object.keys(Genre)
	const actualStatus = Object.keys(Status)
	export let form: ActionData
	export let data: PageServerData
</script>

<svelte:head><title>Codyx - Editar recomendación existente</title></svelte:head>

<section class="min-h-screen h-full grid place-items-center font-mukta">
	<form
		action={`/home/recommendations/edit/${data.form.id}?/edit-recommendation`}
		use:enhance
		method="post"
		class=" flex flex-col justify-center space-y-6 max-w-2xl w-full xl:p-0 p-2"
	>
		<h2 class="text-center text-3xl">Editar recomendación</h2>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="name" class="font-semibold">Nombre de la recomendación</label>
			<input
				type="text"
				name="name"
				value={data.form?.name}
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
				value={data.form?.note}
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
				value={"MANGA"}
				class="px-4 py-3 rounded-lg outline-none bg-light-300  c-gray-800 max-w-2xl font-semibold"
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
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="rating" class="font-semibold"
				>Puntaje de la recomendación (del 1 al 10)</label
			>
			<input
				type="number"
				name="rating"
				value={data.form?.rating && ''}
				placeholder="Por ej. 6"
				class="px-4 py-3 rounded-lg outline-none bg-light-300 c-gray-800 max-w-2xl"
			/>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.fields?.rating}
					<p>{form?.fields?.rating}</p>
				{/if}</span
			>
		</aside>

		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
				<label for="status" class="font-semibold"
					>Estado actual de la recomendación
				</label>
				<select
					name="status"
					value={data.form?.status}
					class="px-4 py-3 rounded-lg outline-none bg-light-300 c-gray-800 max-w-2xl"
				>
					{#each actualStatus as status}
						<option value={status}>
							{status}
						</option>
					{/each}
				</select>
				<span class="h-5 c-red-500"
					>{#if form?.containsErrors && form?.fields?.status}
						<p>{form?.fields?.status}</p>
					{/if}</span
				>
			</aside>
			
		
			
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
				<label for="password" class="font-semibold"
					>Imagen/Preview de la recomendación (Preferiblemente URL)</label
				>

				<input
					type="text"
					name="imgSrc"
					value={data.form?.imgSrc}
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
				class="px-5 py-3 rounded-lg  bg-rose-500 c-gray-50 font-semibold w-full max-w-2xl"
				>Editar recomendación</button
			>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.externalErrors}
					<p>{form?.externalErrors}</p>
				{/if}
			</span>
	</form>
</section>
