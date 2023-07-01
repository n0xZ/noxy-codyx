import { redirect, type ServerLoad } from '@sveltejs/kit'
import { prisma } from '../../lib/server/prisma'
import type { Actions } from './$types'

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.getSession()
	if (!session) throw redirect(302, '/')
	const userReccomendations = await prisma.recommendation.findMany({
		where: { author: { email: session.user?.email ?? '' } },
	})
	return { reccos: userReccomendations }
}
export const actions: Actions = {
	'delete-recommendation': async ({ request }) => {
		const formData = await request.formData()
		const recommId = formData.get('id') as string

		await prisma.recommendation.delete({
			where: { id: recommId },
		})
		throw redirect(302, '/home')
	},
}
