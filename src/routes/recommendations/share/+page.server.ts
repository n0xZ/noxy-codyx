import { userById } from '$lib/server/models/user.server'
import { error, type ServerLoad } from '@sveltejs/kit'
export const load: ServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id')
	if (!id) throw error(400, 'Missing id')
	const user = await userById(id)

	return {
		userMetadata: { name: user.name, image: user.image },
		recommendations: user.recommendations,
	}
}
