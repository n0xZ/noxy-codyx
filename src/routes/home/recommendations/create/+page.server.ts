import type { Actions } from './$types'
import { z } from 'zod'
import { fail } from '@sveltejs/kit'
import { imageKit } from '$lib/server/imagekit'
import { parseFileToBase64 } from '$lib/server/parse-file'
import { createRecommendation } from '$lib/server/models/recommendation.server'

const createRecommendationSchema = z.object({
	name: z.string().min(3, { message: 'Campo requerido' }),
	note: z.string(),
	img: z
		.instanceof(File)
		.refine((f) => f.size < 0, 'Este campo es requerido')
		.refine((f) => f.type),

	genre: z.enum(['MOVIE', 'SERIE', 'ANIME', 'MANGA', 'NOVEL', 'OTHER']),
})
export const actions: Actions = {
	'create-recommendation': async ({ request, locals }) => {
		const requestFormData = Object.fromEntries(
			await request.formData()
		) as z.infer<typeof createRecommendationSchema>
		const formData = createRecommendationSchema.safeParse(requestFormData)
		console.log(formData)
		if (formData.success) {
			const session = await locals.getSession()
			const { genre, img, name, note } = formData.data
			const parsedImage = await parseFileToBase64(img)
			const result = await imageKit.upload({
				file: parsedImage,
				fileName: formData.data.img.name,
				tags: ['recommendation'],
			})
			const newRecomm = await createRecommendation({
				name,
				note,
				authorEmail: session?.user?.email ?? '',
				genre,
				img: { src: result.url, width: result.width, height: result.height },
			})
			if (!newRecomm) {
				return fail(500, { message: 'Error al crear la recomendación' })
			}
		} else {
			const containsErrors = Boolean(
				formData.error.formErrors.fieldErrors.name ||
					formData.error.formErrors.fieldErrors.note ||
					formData.error.formErrors.fieldErrors.img
			)
			return fail(400, {
				containsErrors,
				fields: {
					name: formData.error.formErrors.fieldErrors.name?.[0],
					note: formData.error.formErrors.fieldErrors.note?.[0],
					img: formData.error.formErrors.fieldErrors.img?.[0],
					genre: formData.error.formErrors.fieldErrors.genre?.[0],
				},
				externalErrors: undefined,
			})
		}
	},
}
