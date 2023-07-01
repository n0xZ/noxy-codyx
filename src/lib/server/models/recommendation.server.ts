import type { Image, Genre, Status } from '@prisma/client'
import { prisma } from '../prisma'

type UpdateRecommendationInput = {
	id: string
	name?: string
	note?: string
	img?: Image
	genre?: Genre
	status?: Status
	rating?: number
}
export const recommendationsByAuthor = async (authorEmail: string) => {
	const recommendations = await prisma.recommendation.findMany({
		where: { author: { email: authorEmail } },
	})
	return recommendations
}

export const createRecommendation = async ({
	img,
	name,
	note,
	genre,
	authorEmail,
}: {
	name: string
	note: string
	img: Omit<Image, 'id'>
	genre: Genre
	authorEmail: string
}) => {
	const createdRecommendation = await prisma.recommendation.create({
		data: {
			name,
			note,
			author: { connect: { email: authorEmail } },
			genre,
			img: { create: img },
		},
	})
	return createdRecommendation
}

export const deleteRecommendation = async (id: string) => {
	const deletedRecommendation = await prisma.recommendation.delete({
		where: { id },
	})
	return deletedRecommendation
}
export const updateRecommendation = async ({
	name,
	rating,
	status,
	note,
	genre,

	id,
}: UpdateRecommendationInput) => {
	const updatedRecomm = await prisma.recommendation.update({
		data: { name, rating, status, note, genre },
		where: { id },
	})
	return updatedRecomm
}
