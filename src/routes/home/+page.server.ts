import { redirect, type ServerLoad } from '@sveltejs/kit'
import type { Actions } from './$types'

export const load: ServerLoad = async ({ cookies }) => {
	const loggedUser = cookies.get('user-session')
	if (!loggedUser) return redirect(302, '/')
}
export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('user-session')
		return redirect(302, '/')
	},
}
