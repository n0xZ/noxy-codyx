import { error, type ServerLoad } from '@sveltejs/kit'
import type { Actions } from './$types'
import { deleteRecommendation } from '$lib/server/models/recommendation.server'
import { imageKit } from '$lib/server/imagekit'
import { prisma } from '../../lib/server/prisma'

export const load: ServerLoad = async ({ locals }) => {
	const session = await locals.getSession()
	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email ?? '' },
		select: {
			id: true,

			recommendations: {
				select: {
					recId: true,
					genre: true,
					img: true,
					name: true,
					note: true,
					status: true,
					rating: true,
					createdAt: true,
				},
			},
			isContentPublic: true,
		},
	})

	if (!user) throw error(404, 'User not found')

	return {
		reccos: user.recommendations,
		userMetadata: { id: user.id, isContentPublic: user.isContentPublic },
	}
}

export const actions: Actions = {
	'delete-recommendation': async ({ request }) => {
		const formData = await request.formData()
		const id = formData.get('id') as string
		const recc = await prisma.recommendation.findUnique({
			where: { id },
			select: { recId: true, img: { select: { fileId: true } } },
		})
		await deleteRecommendation(recc?.recId ?? '')
		await imageKit.deleteFile(recc?.img?.fileId ?? '')
	},
	updateUserContentStatus: async ({ locals }) => {
		const session = await locals.getSession()
		let isSucess = false
		const updatedUserStatus = await prisma.user.update({
			data: { isContentPublic: true },
			where: { email: session?.user?.email ?? '' },
		})
		if (updatedUserStatus) isSucess = true
		return {
			isSucess,
		}
	},
}
