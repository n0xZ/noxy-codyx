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
	'delete-recommendation': async ({ request, url }) => {
		const formData = await request.formData()
		const recommId = formData.get('id')

		await prisma.recommendation.delete({
			where: { id: recommId },
		})
		throw redirect(302, '/home')
	},
}
