<script lang="ts">
	import type { Session } from '@auth/core/types'
	export let userMetadata: Session | null
		import { signOut } from '@auth/sveltekit/client'
	import { env } from '$env/dynamic/public'
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/ui/avatar'
	import Button from '$lib/ui/button.svelte'
	import {
		Sheet,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetTitle,
		SheetTrigger,
	} from '$lib/ui/sheet'
	import { browser } from '$app/environment'
	const callbackUrl = env.PUBLIC_AUTH_ORIGIN_URL
	const signOutUser = () => signOut({ redirect: false, callbackUrl })
	const username = userMetadata?.user?.name
	const fallbackUsername = username?.slice(0, 2)

</script>

<Sheet >
	<SheetTrigger>
		<Avatar>
			<AvatarImage
				src={userMetadata?.user?.image ?? ''}
				alt={`Imagen de ${userMetadata?.user?.name}`}
			/>
			<AvatarFallback>{fallbackUsername}</AvatarFallback>
		</Avatar>
	</SheetTrigger>
	<SheetContent position="left" size="content">
		<SheetHeader>
			<SheetTitle>Perfil</SheetTitle>
			<SheetDescription>
				Bienvenid@, {username}!
			</SheetDescription>
		</SheetHeader>
		<aside class="grid gap-3 py-3 opacity-60">
			<a href="/home/recommendations/create" class="hover:underline"
				>Crear nueva recomendación</a
			>
		</aside>
		<SheetFooter>
			<Button on:click={signOutUser}>Cerrar sesión</Button>
		</SheetFooter>
	</SheetContent>
</Sheet>
