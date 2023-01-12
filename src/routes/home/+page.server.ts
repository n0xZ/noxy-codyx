import { redirect, type ServerLoad } from '@sveltejs/kit'
import { prisma } from '../../lib/server/prisma'
import type { Actions } from './$types'

export const load: ServerLoad = async ({ locals }) => {
	if (!locals.userId) throw redirect(302, '/')
	const userReccomendations = await prisma.recommendation.findMany({
		where: { authorId: locals.userId },
	})
	return { reccos: userReccomendations }
}
export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('user-session')
		throw redirect(302, '/')
	},
}
