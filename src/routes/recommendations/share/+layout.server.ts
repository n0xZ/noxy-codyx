import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const sess = await locals.getSession()

	if (!sess)
		return {
			isAuth: false,
		}
	return {
		isAuth: true,
	}
}
