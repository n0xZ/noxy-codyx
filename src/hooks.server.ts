import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private'
import { prisma } from '$lib/server/prisma'

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		// @ts-ignore
		GitHub({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
})
