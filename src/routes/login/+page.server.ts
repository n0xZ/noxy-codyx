import { redirect, type ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
	const sess = await locals.getSession()
	if (sess) throw redirect(302, '/home')
	return null
}
