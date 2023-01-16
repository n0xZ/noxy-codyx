
<script lang="ts">
import MobileLandingMenu from '$lib/components/menu/landing.svelte'

</script>
<svelte:head>
	<title>Bienvenid@ a Codyx!</title>
</svelte:head>
<header class="p-6 ">
	<nav
		class="flex flex-row items-center justify-between container mx-auto max-w-5xl xl:text-lg text-base font-normal  font-commissioner "
	>
		<h1>
			<a
				href="/"
				class="no-underline list-upper-roman hover:c-rose-500 duration-100 ease-in-out font-semibold"
				>Codyx</a
			>
		</h1>
		<ul class="xl:flex hidden flex-row items-center space-x-4  ">
			<li>
				<a
					href="/login"
					class="px-8 py-4 rounded-lg no-underline hover:c-rose-500 duration-100 ease-in-out"
				>
					INICIAR SESIÓN
				</a>
			</li>
			<li>
				<a
					href="/register"
					class="px-8 py-4 rounded-lg no-underline text-light-50 font-commissioner bg-rose-500  "
				>
					UNETE YA
				</a>
			</li>
		</ul>
		<MobileLandingMenu/>
	</nav>
</header>
<section
	class="min-h-screen h-full flex flex-col justify-center items-center space-y-5 font-mukta"
>
	<h2 class="text-center xl:text-5xl text-3xl p-2">
		Imposible olvidar tu <span class="c-rose-500 ">lista de recomendaciones</span>
		con Codyx
	</h2>
	
	<a href="/login" class="px-6 py-4 outline-none bg-rose-500 rounded-lg  c-gray-50"
		>Comenzar ya</a
	>
</section>
