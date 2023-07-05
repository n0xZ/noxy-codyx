import { userById } from '$lib/server/models/user.server'
import { error, type ServerLoad } from '@sveltejs/kit'
export const load: ServerLoad = async ({ params }) => {
	const id = params.id

	if (!id) throw error(400, 'Missing id')
	const user = await userById(id)

	return {
		user,
	}
}
