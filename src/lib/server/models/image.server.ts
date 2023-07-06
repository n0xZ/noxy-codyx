import { prisma } from '../prisma'

type CreateImageInput = {
	src: string
	width: number
	height: number
	fileId: string
	recId: string
}

export const createImage = async ({
	fileId,
	height,
	recId,
	src,
	width,
}: CreateImageInput) => {
	const createdImage = await prisma.image.create({
		data: {
			fileId,
			height,
			src,
			width,
			recommendation: { connect: { id: recId } },
		},
	})
	return createdImage
}
