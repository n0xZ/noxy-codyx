import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
	event.locals.userId = event.cookies.get('user-session')
	return resolve(event)
}) satisfies Handle
