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
import { sequence } from '@sveltejs/kit/hooks'

const authorization: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/home')) {
		const sess = await event.locals.getSession()
		if (!sess) throw redirect(302, '/')
	}

	return resolve(event)
}

export const handle: Handle = sequence(
	SvelteKitAuth({
		adapter: PrismaAdapter(prisma),
		providers: [
			GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET }),
		],
		secret: SESSION_SECRET,
	}),
	authorization
)
