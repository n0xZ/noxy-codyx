<script lang="ts">
import {signIn} from '@auth/sveltekit/client'
 import {Github} from 'lucide-svelte'
 import {env} from '$env/dynamic/public'
 
	import Button from '$lib/ui/button.svelte'
	const callbackUrl = env.PUBLIC_AUTH_CALLBACK_URL+ "/home"

</script>

<svelte:head><title>Codyx - Iniciar sesión</title></svelte:head>

<main class="h-screen grid place-items-center ">
	<section
		class="flex flex-col justify-center space-y-3 max-w-xl container mx-auto border-2 p-3 border-primary/10 rounded-md h-1/2"
	>
		<h2
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center"
		>
			Inicia sesión en Codyx!
		</h2>

		<Button
			class="flex flex-row items-center space-x-2"
			on:click={() => signIn('github', { callbackUrl })}
		>
			<Github class="h-6 w-6" />
			<span>Iniciar sesión desde Github</span></Button
		>
	</section>
</main>