import { fail, redirect, type ServerLoad } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { z } from 'zod'
import type { Actions } from './$types'
const editRecommendationSchema = z.object({
	name: z.string().min(3, { message: 'Campo requerido' }),
	note: z.string(),
	imgSrc: z.string().url(),
	genre: z.enum(['FILM', 'SERIE', 'ANIME', 'MANGA', 'NOVEL', 'OTHER']),
	status: z.enum(['IN_PROGRESS', 'FINISHED']),
	rating: z.string().optional(),
})
export const load: ServerLoad = async ({ params }) => {
	const existingRecommendation = await prisma.recommendation.findUnique({
		where: { id: params.id },
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
					imgSrc: formData.data.imgSrc,
					status: formData.data.status,
					rating: formData.data.rating ? parseInt(formData.data.rating) : null,
				},
				where: { id: params.id },
			})
			throw redirect(302, '/home')
		} else {
			const containsErrors = Boolean(
				formData.error.formErrors.fieldErrors.name ||
					formData.error.formErrors.fieldErrors.note ||
					formData.error.formErrors.fieldErrors.imgSrc ||
					formData.error.formErrors.fieldErrors.genre ||
					formData.error.formErrors.fieldErrors.status ||
					formData.error.formErrors.fieldErrors.rating
			)
			return fail(400, {
				containsErrors,
				fields: {
					name: formData.error.formErrors.fieldErrors.name?.[0],
					note: formData.error.formErrors.fieldErrors.note?.[0],
					imgSrc: formData.error.formErrors.fieldErrors.imgSrc?.[0],
					genre: formData.error.formErrors.fieldErrors.genre?.[0],
					status: formData.error.formErrors.fieldErrors.status?.[0],
					rating: formData.error.formErrors.fieldErrors.rating?.[0],
				},
				externalErrors: undefined,
			})
		}
	},
}
