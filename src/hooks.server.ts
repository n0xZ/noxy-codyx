import { redirect, type Handle } from '@sveltejs/kit'
import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	SESSION_SECRET,
} from '$env/static/private'
import { prisma } from '$lib/server/prisma'

const authorization: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/home')) {
		const session = await event.locals.getSession()
		if (!session) {
			throw redirect(303, '/auth')
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event)
}

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		// @ts-ignore
		GitHub({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
	secret: SESSION_SECRET,
	authorization,
})
