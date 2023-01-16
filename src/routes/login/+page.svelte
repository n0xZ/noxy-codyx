<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	export let form: ActionData
</script>

<svelte:head><title>Codyx - Iniciar sesión</title></svelte:head>

<section class="h-screen grid place-items-center font-mukta">
	<form
		action="/login?/loginUser"
		use:enhance
		method="post"
		class=" flex flex-col justify-center space-y-6 max-w-2xl w-full xl:p-0 p-1"
	>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="email" class="font-semibold">Correo electrónico</label>
			<input
				type="email"
				name="email"
								placeholder="janedoe@email.net"
				class="px-4 py-3 rounded-lg outline-none border-2 border-rose-200 c-gray-800 max-w-2xl"
			/>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.fields?.email}
					<p>{form?.fields?.email}</p>
				{/if}</span
			>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl">
			<label for="password" class="font-semibold">Contraseña</label>

			<input
				type="password"
				name="password"
					placeholder="janepassword"
				class="px-4 py-3 rounded-lg outline-none  border-2 border-rose-200 c-gray-800 max-w-2xl"
			/>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.fields?.password}
					<p>{form?.fields?.password  }</p>
			
				{/if}
			</span>
		</aside>
		<button
			type="submit"
			class="px-5 py-3 rounded-lg  bg-rose-500 c-gray-50 font-semibold w-full max-w-2xl"
			>Iniciar sesión</button
		>
			<span class="h-5 c-red-500"
				>{#if form?.containsErrors && form?.externalErrors}
					<p>{form?.externalErrors  }</p>
			
				{/if}
			</span>
			<a href="/register" class="text-center underline">No tengo una cuenta</a>
	</form>
</section>
