<script lang="ts">
	import { enhance } from '$app/forms'
	import {
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
	} from '$lib/ui/alert-dialog'
	import Button from '$lib/ui/button.svelte'
</script>

<AlertDialogContent>
	<AlertDialogHeader>
		<AlertDialogTitle
			>Estás seguro de compartir tu lista de recomendaciones?</AlertDialogTitle
		>
		<AlertDialogDescription>
			Esta opción hará que puedas compartir tu lista de recomendaciones a tu
			pública y es irreversible.
		</AlertDialogDescription>
	</AlertDialogHeader>
	<AlertDialogFooter>
		<AlertDialogCancel>Cancelar</AlertDialogCancel>

		<AlertDialogAction type="button">
			<form action="?/home" method="post" use:enhance class="w-full">
				<Button variant="ghost">Aceptar</Button>
			</form>
		</AlertDialogAction>
	</AlertDialogFooter>
</AlertDialogContent>
