<script lang="ts">
	import { MoonIcon, SunIcon } from 'lucide-svelte'
 import { browser,  } from '$app/environment';
	import Button from '$lib/ui/button.svelte'
	type Theme = 'dark' | 'light'

	const storedTheme = browser ? (localStorage.getItem('theme') as Theme | null) : "light"
	const actualTheme = storedTheme ? storedTheme : ('light' satisfies Theme)
	let theme: Theme = actualTheme
	const toggleTheme = () =>
		theme === 'light' ? (theme = 'dark') : (theme = 'light')
	$: {
		if(browser){
         let rootEl = document.documentElement
		if (theme === 'dark') {
			rootEl.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else if (theme === 'light') {
			rootEl.classList.remove('dark')
			localStorage.removeItem('theme')
		}
      }
	}
</script>

<Button variant="outline" on:click={toggleTheme}>
	<SunIcon
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden block"
	/>
	<MoonIcon
		class=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:block hidden"
	/>
</Button>
