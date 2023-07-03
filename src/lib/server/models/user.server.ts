import { prisma } from '../prisma'

export const userById = async (id?: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: { id },
		select: { recommendations: true, name: true, image: true },
	})

	return user
}
