import type { Actions } from './$types'
import { z } from 'zod'
import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'

const createRecommendationSchema = z.object({
	name: z.string().min(3, { message: 'Campo requerido' }),
	note: z.string(),
	imgSrc: z.string().url(),
	genre: z.enum(['MOVIE', 'SERIE', 'ANIME', 'MANGA', 'NOVEL', 'OTHER']),
})
export const actions: Actions = {
	'create-recommendation': async ({ request, locals }) => {
		const requestFormData = Object.fromEntries(
			await request.formData()
		) as z.infer<typeof createRecommendationSchema>
		const formData = createRecommendationSchema.safeParse(requestFormData)

		if (formData.success) {
			const newRecommendation = await prisma.recommendation.create({
				data: { ...formData.data, author: { connect: { id: locals.userId } } },
			})
			throw redirect(302, '/home')
		} else {
			const containsErrors = Boolean(
				formData.error.formErrors.fieldErrors.name ||
					formData.error.formErrors.fieldErrors.note
			)
			return fail(400, {
				containsErrors,
				fields: {
					name: formData.error.formErrors.fieldErrors.name?.[0],
					note: formData.error.formErrors.fieldErrors.note?.[0],
					imgSrc: formData.error.formErrors.fieldErrors.imgSrc?.[0],
					genre: formData.error.formErrors.fieldErrors.genre?.[0],
				},
				externalErrors: undefined,
			})
		}
	},
}
