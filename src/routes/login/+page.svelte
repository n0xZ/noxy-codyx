<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	export let form: ActionData
</script>

<main class="h-screen grid place-items-center">
	<form action="/login?/loginUser" use:enhance method="post" class=" flex flex-col justify-center space-y-6 max-w-2xl w-full xl:p-0 p-1">
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="email" class="font-semibold">Correo electrónico</label>
			<input
				type="email"
				name="email"
				class="px-4 py-3 rounded-lg outline-none bg-purple-50 c-gray-800 max-w-2xl"
			/>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors}
					<p>{form?.fields?.email}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="password" class="font-semibold">Contraseña</label>

			<input
				type="password"
				name="password"
				class="px-4 py-3 rounded-lg outline-none bg-purple-50 c-gray-800 max-w-2xl"
			/>
				<span class="h-5 c-red-500"
				>{#if form?.containsErrors}
					<p>{form?.fields?.password}</p>
				{/if}</span
			>
		</aside>
		<button
			type="submit"
			class="px-5 py-3 rounded-lg outline-none bg-purple-300 c-gray-600 font-semibold w-full max-w-2xl"
			>Iniciar sesión</button
		>
	</form>
</main>
