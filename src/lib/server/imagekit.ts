import ImageKit from 'imagekit'
import { env } from '$env/dynamic/private'
export const imageKit = new ImageKit({
	urlEndpoint: env.IMAGEKIT_ENDPOINT,
	privateKey: env.IMAGEKIT_PRIVATE_KEY,
	publicKey: env.IMAGEKIT_PUBLIC_KEY,
})
