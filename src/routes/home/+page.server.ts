import type { ServerLoad } from '@sveltejs/kit'
import { prisma } from '../../lib/server/prisma'
import type { Actions } from './$types'
import {
	deleteRecommendation,
	recommendationsByAuthor,
} from '$lib/server/models/recommendation.server'
import { imageKit } from '$lib/server/imagekit'

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.getSession()

	const userReccomendations = await recommendationsByAuthor(
		session?.user?.email ?? ''
	)

	return { reccos: userReccomendations }
}
export const actions: Actions = {
	'delete-recommendation': async ({ request }) => {
		const formData = await request.formData()
		const id = formData.get('id') as string
		const recc = await prisma.recommendation.findUnique({
			where: { id },
			select: { id: true, img: { select: { fileId: true } } },
		})
		await deleteRecommendation(recc?.id ?? '')
		await imageKit.deleteFile(recc?.img?.fileId ?? '')
	},
}
