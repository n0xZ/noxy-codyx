<script lang="ts">
	import { ClipboardCopy } from 'lucide-svelte'
	import { PUBLIC_AUTH_CALLBACK_URL } from '$env/static/public'
	import {
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
	} from '$lib/ui/alert-dialog'

	import Input from '$lib/ui/input.svelte'
	import Label from '$lib/ui/label.svelte'


	export let id: string
	$: url = `${PUBLIC_AUTH_CALLBACK_URL}/recommendations/share?userId=${id}`
	const addToClipboard = () => {
		navigator.clipboard.writeText(url)
	}
</script>

<AlertDialogContent>
	<AlertDialogHeader>
		<AlertDialogTitle>Compartir link</AlertDialogTitle>
		<AlertDialogDescription>
			Ahora podrás compartir tu lista de recomendaciones por medio de este link!
		</AlertDialogDescription>
		<div class="mt-5 grid gap-2">
			<Label for="email">Link de tus recomendaciones</Label>
			<div class="flex flex-row items-center space-x-2">
				<Input type="url" value={url} disabled />

				<AlertDialogAction on:click={addToClipboard} title="Agregar a portapapeles">
					<ClipboardCopy class=" h-[1.2rem] w-[1.2rem] " />
				</AlertDialogAction>
			</div>
		</div>
	</AlertDialogHeader>
	<AlertDialogFooter>
		<AlertDialogCancel>Cancelar</AlertDialogCancel>

		<AlertDialogAction>Aceptar</AlertDialogAction>
	</AlertDialogFooter>
</AlertDialogContent>
