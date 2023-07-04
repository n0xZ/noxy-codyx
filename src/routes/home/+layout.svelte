<script lang="ts">
	import { signOut } from '@auth/sveltekit/client'
	import { env } from '$env/dynamic/public'

	import HomeSheet from '$lib/components/sheet/home.svelte'
	import type { LayoutServerData } from './$types'

	const callbackUrl = env.PUBLIC_AUTH_ORIGIN_URL
	const signOutUser = () => signOut({ redirect: false, callbackUrl })
	export let data: LayoutServerData
</script>

<header class="p-5 w-full border-b-2 border-primary/5 sticky top-0 bg-white">
	<nav
		class="flex flex-row items-center justify-between container w-full mx-auto max-w-4xl text-base"
	>
		<a href="/home" class="hover:underline" data-sveltekit-preload-data="hover">Home</a>
		<HomeSheet userMetadata={data.session} />
	</nav>
</header>
<div class="h-full mt-4"><slot /></div>
