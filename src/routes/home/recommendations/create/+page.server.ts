import type { Actions } from './$types'
import { z } from 'zod'
import { prisma } from '$lib/server/prisma'
import { fail, redirect } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import ImageKit from 'imagekit'

const imageKit = new ImageKit({
	urlEndpoint: env.IMAGEKIT_ENDPOINT,
	privateKey: env.IMAGEKIT_PRIVATE_KEY,
	publicKey: env.IMAGEKIT_PUBLIC_KEY,
})

const createRecommendationSchema = z.object({
	name: z.string().min(3, { message: 'Campo requerido' }),
	note: z.string(),
	img: z.instanceof(File).refine((f) => f.size < 0, 'Este campo es requerido'),

	genre: z.enum(['MOVIE', 'SERIE', 'ANIME', 'MANGA', 'NOVEL', 'OTHER']),
})
export const actions: Actions = {
	'create-recommendation': async ({ request }) => {
		const requestFormData = Object.fromEntries(
			await request.formData()
		) as z.infer<typeof createRecommendationSchema>
		const formData = createRecommendationSchema.safeParse(requestFormData)
		console.log(formData)
		if (formData.success) {
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
					imgSrc: formData.error.formErrors.fieldErrors.img?.[0],
					genre: formData.error.formErrors.fieldErrors.genre?.[0],
				},
				externalErrors: undefined,
			})
		}
	},
}
