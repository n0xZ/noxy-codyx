<script lang="ts">
import type{  ActionData } from './$types'
export let form:ActionData

</script>

<main class="h-screen">
	<form action="/login?/loginUser">
		<aside>
		<label for="username">Nombre de usuario</label>
      	<input type="text" name="username" />
		</aside>
		<input type="password" name="password" />
	<button type="submit">Iniciar sesión</button>
   </form>
</main>
