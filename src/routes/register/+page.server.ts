import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import type { Actions } from './$types'

import { prisma } from '../../lib/server/prisma'

const registerSchema = z.object({
	username: z.string({ required_error: 'Campo requerido' }),
	email: z
		.string({ required_error: 'Campo requerido' })
		.email({ message: 'Email ingresado no valido' }),
	password: z.string({ required_error: 'Campo requerido' }),
})
export const actions: Actions = {
	registerUser: async ({ request, cookies }) => {
		const requestedFormData = Object.fromEntries(
			await request.formData()
		) as z.infer<typeof registerSchema>
		const formData = registerSchema.safeParse(requestedFormData)
		if (formData.success) {
			const existingUser = await prisma.user.findUnique({
				where: { email: formData.data.email },
			})
			if (existingUser) return
			const hashedPassword = await bcryptjs.hash(formData.data.password, 10)
			const createdUser = await prisma.user.create({
				data: {
					email: formData.data.email,
					password: hashedPassword,
					username: formData.data.username,
				},
			})
			console.log(createdUser)
			cookies.set('user-session', createdUser.id, {
				path: '/',
				maxAge: 60 * 60 * 24,
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
			})
			return redirect(302, '/home')
		}
		const containsErrors = Boolean(
			formData.error.formErrors.fieldErrors.username ||
				formData.error.formErrors.fieldErrors.email ||
				formData.error.formErrors.fieldErrors.password
		)

		return fail(400, {
			containsErrors,
			fields: {
				username: formData.error.formErrors.fieldErrors.username?.[0],
				email: formData.error.formErrors.fieldErrors.email?.[0],
				password: formData.error.formErrors.fieldErrors.password?.[0],
			},
		})
	},
}
