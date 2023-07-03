import { prisma } from '../prisma'
import { error } from '@sveltejs/kit'
export const userById = async (id?: string) => {
	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			recommendations: true,
			name: true,
			image: true,
			isContentPublic: true,
		},
	})
	if (!user) throw error(404, 'Usuario no encontrado')
	if (!user.isContentPublic)
		throw error(403, 'Las recomendaciones de este usuario son privadas.')
	return user
}
