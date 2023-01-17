import { sveltekit } from '@sveltejs/kit/vite'
import { presetWebFonts, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { createRequire } from 'module'

const prismaPlugin = () => {
	const require = createRequire(import.meta.url)
	const pathName = require
		.resolve('@prisma/client')
		.replace('@prisma/client/index.js', '')

	return {
		name: 'prisma-vite-plugin',
		config: () => ({
			resolve: {
				alias: {
					'.prisma/client/index-browser': `${pathName}.prisma/client/index-browser.js`,
				},
			},
		}),
	}
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		prismaPlugin(),
		Unocss({
			presets: [
				presetUno(),
				presetWebFonts({
					provider: 'google',
					fonts: {
						commissioner: 'Commissioner',
						mukta: 'Mukta',
					},
				}),
			],
		}),
	],
}

export default config
