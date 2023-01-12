import { json, redirect, type ServerLoad } from '@sveltejs/kit'
import { prisma } from '../../lib/server/prisma'
import type { Actions } from './$types'

export const load: ServerLoad = async ({ cookies }) => {
	const loggedUser = cookies.get('user-session')
	if (!loggedUser) throw redirect(302, '/')
	const userReccomendations = await prisma.recommendation.findMany({
		where: { authorId: loggedUser },
	})
	return { reccos: userReccomendations }
}
export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('user-session')
		throw redirect(302, '/')
	},
}
