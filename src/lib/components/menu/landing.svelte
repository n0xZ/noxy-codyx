<script lang="ts">

	import {
		Transition,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	} from '@rgossiaux/svelte-headlessui'
   import MenuIcon from '../icons/menu.svelte'
</script>

<Menu class="relative xl:hidden lg:hidden inline-block text-left">
	<div>
		<MenuButton
			class="inline-flex w-full justify-center items-center rounded-md bg-rose-600 bg-opacity-60 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			<MenuIcon
				
				menuClass=" h-5 w-5 text-rose-200 hover:text-rose-100"
		
			/>
		</MenuButton>
	</div>
	<Transition
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-95"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-75"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-95"
	>
		<MenuItems
			class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<div class="px-1 py-1 ">
				<MenuItem>
					<a
						href="/login"
						class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-rose-500 hover-c-white duration-100 ease-in-out"
					>
						Iniciar sesión
					</a>
				</MenuItem>
	

			</div>
		</MenuItems>
	</Transition>
</Menu>
