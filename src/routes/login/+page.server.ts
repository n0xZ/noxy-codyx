import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import type { Actions } from './$types'
import { prisma } from '../../utils/prisma'

const loginSchema = z.object({
	email: z
		.string({ required_error: 'Campo requerido' })
		.email({ message: 'Email ingresado no valido' }),
	password: z.string({ required_error: 'Campo requerido' }),
})
export const actions: Actions = {
	loginUser: async ({ request }) => {
		const requestedFormData = Object.fromEntries(
			await request.formData()
		) as z.infer<typeof loginSchema>
		const formData = loginSchema.safeParse(requestedFormData)
		if (formData.success) {
			const existingUser = await prisma.user.findUnique({
				where: { email: formData.data.email },
			})
			if (!existingUser) return
			const passwordMatches = await bcryptjs.compare(
				formData.data.email,
				existingUser.password
			)
			if (!passwordMatches) return
			return redirect(301, '/home')
		}
		const containsErrors = Boolean(
			formData.error.formErrors.fieldErrors.email ||
				formData.error.formErrors.fieldErrors.password
		)

		return fail(400, {
			containsErrors,
			fields: {
				email: formData.error.formErrors.fieldErrors.email?.[0],
				password: formData.error.formErrors.fieldErrors.password?.[0],
			},
		})
	},
}
