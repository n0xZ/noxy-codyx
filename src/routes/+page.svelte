
<script lang="ts">


</script>
<svelte:head>
	<title>Bienvenid@ a Codyx!</title>
</svelte:head>
<header class="p-6 ">
	<nav
		class="flex flex-row items-center justify-between container mx-auto max-w-5xl xl:text-lg text-base    "
	>
		<h1>
			<a
				href="/"
				class="no-underline list-upper-roman hover:text-rose-500 duration-100 ease-in-out font-semibold"
				>Codyx</a
			>
		</h1>
		<ul class="flex  flex-row items-center space-x-4  opacity-90">
			<li>
				<a
					href="/login"
			data-sveltekit-preload-data="hover"
				>
					Iniciar sesión
				</a>
			</li>
	

	</nav>
</header>
<section
	class="min-h-screen h-full flex flex-col justify-center items-center space-y-5  max-w-5xl container mx-auto"
>
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
		Imposible olvidar tu <span class="text-rose-500 ">lista de recomendaciones</span>
		con Codyx
	</h1>
	
	<a href="/login" class="px-6 py-4 outline-none bg-rose-500 rounded-lg  text-gray-50" data-sveltekit-preload-data="hover"
		>Comenzar ya</a
	>
</section>
