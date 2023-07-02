import { fail, redirect, type ServerLoad } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { z } from 'zod'
import type { Actions } from './$types'

const editRecommendationSchema = z.object({
	name: z.string().min(3, { message: 'Campo requerido' }),
	note: z.string(),
	img: z.any(),
	genre: z.enum(['MOVIE', 'SERIE', 'ANIME', 'MANGA', 'NOVEL', 'OTHER']),
	status: z.enum(['IN_PROGRESS', 'FINISHED']),
	rating: z.string().optional(),
})

export const load: ServerLoad = async ({ params }) => {
	const existingRecommendation = await prisma.recommendation.findUnique({
		where: { id: params.id },
		select: {
			img: true,
			name: true,
			note: true,
			genre: true,
			status: true,
			rating: true,
		},
	})

	if (!existingRecommendation) throw redirect(302, '/home')
	return { form: existingRecommendation }
}
export const actions: Actions = {
	'edit-recommendation': async ({ request, params }) => {
		const requestFormData = Object.fromEntries(
			await request.formData()
		) as z.infer<typeof editRecommendationSchema>

		const formData = editRecommendationSchema.safeParse(requestFormData)

		if (formData.success) {
			const newRecommendation = await prisma.recommendation.update({
				data: {
					name: formData.data.name,
					note: formData.data.note,
					genre: formData.data.genre,
					status: formData.data.status,
					rating: formData.data.rating ? parseInt(formData.data.rating) : null,
				},
				where: { id: params.id },
			})
			if (newRecommendation) throw redirect(302, '/home')
		} else {
			const containsErrors = Boolean(
				formData.error.formErrors.fieldErrors.name ||
					formData.error.formErrors.fieldErrors.note ||
					formData.error.formErrors.fieldErrors.img ||
					formData.error.formErrors.fieldErrors.genre ||
					formData.error.formErrors.fieldErrors.status ||
					formData.error.formErrors.fieldErrors.rating
			)
			return fail(400, {
				containsErrors,
				fields: {
					name: formData.error.formErrors.fieldErrors.name?.[0],
					note: formData.error.formErrors.fieldErrors.note?.[0],
					img: formData.error.formErrors.fieldErrors.img?.[0],
					genre: formData.error.formErrors.fieldErrors.genre?.[0],
					status: formData.error.formErrors.fieldErrors.status?.[0],
					rating: formData.error.formErrors.fieldErrors.rating?.[0],
				},
				externalErrors: undefined,
			})
		}
	},
}
