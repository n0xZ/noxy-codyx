import { PrismaClient } from '@prisma/client'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
type LoginFormData = {
	username: string
	password: string
}
export const actions: Actions = {
	loginUser: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as LoginFormData
		const client = new PrismaClient()
		const existingUser = await client.user.findUnique({
			where: { username: formData.username },
		})
		if (!existingUser) return fail(400, { error: 'User does not exist.' })
		return redirect(301, '/home')
	},
}
