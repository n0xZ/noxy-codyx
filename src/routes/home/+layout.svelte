<script lang="ts">
	import HomeSheet from '$lib/components/sheet/home.svelte'
	import ThemeSwitcher from '$lib/components/theme/theme-switcher.svelte'
	import type { LayoutServerData } from './$types'

	export let data: LayoutServerData
</script>

<header
	class="p-5 w-full border-b-2 border-primary/5 sticky top-0 bg-background"
>
	<nav
		class="flex flex-row items-center justify-between container w-full mx-auto max-w-4xl text-base"
	>
		<a href="/home" class="hover:underline" data-sveltekit-preload-data="hover"
			>Home</a
		>
		<ul class="flex flex-row items-center space-x-5">
			<li><ThemeSwitcher /></li>
			<li>
				<HomeSheet userMetadata={data.session} />
			</li>
		</ul>
	</nav>
</header>
<div class="h-full mt-4"><slot /></div>
