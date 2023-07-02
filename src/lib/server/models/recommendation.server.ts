import type { Image, Genre } from '@prisma/client'
import { prisma } from '../prisma'

export const recommendationsByAuthor = async (authorEmail: string) => {
	const recommendations = await prisma.recommendation.findMany({
		where: { author: { email: authorEmail } },
		select: {
			id: true,

			genre: true,
			img: true,
			name: true,
			note: true,
			status: true,
			rating: true,
			createdAt: true,
		},
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
