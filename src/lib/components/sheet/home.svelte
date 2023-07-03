<script lang="ts">
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
	import type { Session } from '@auth/core/types'
	export let userMetadata: Session | null
	const username = userMetadata?.user?.name
	const fallbackUsername = username?.slice(0, 2)
</script>

<Sheet>
	<SheetTrigger>
		<Avatar>
			<AvatarImage
				src={userMetadata?.user?.image ?? ''}
				alt={`Imagen de ${userMetadata?.user?.name}`}
			/>
			<AvatarFallback>{fallbackUsername}</AvatarFallback>
		</Avatar>
	</SheetTrigger>
	<SheetContent position="left" size="sm">
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
			<Button>Cerrar sesión</Button>
		</SheetFooter>
	</SheetContent>
</Sheet>
