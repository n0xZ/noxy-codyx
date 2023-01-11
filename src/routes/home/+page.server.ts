import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('user-session')
		return redirect(302, '/')
	},
}
