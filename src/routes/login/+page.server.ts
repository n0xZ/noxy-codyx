import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import type { Actions } from './$types'
import { prisma } from 'src/utils/prisma'

const loginSchema = z.object({
	email: z.string().email({ message: 'Email ingresado no valido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})
export const actions: Actions = {
	loginUser: async ({ request }) => {
		const formData = loginSchema.safeParse(await request.formData())

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
		return fail(400, { formErrors: formData.error })
	},
}
