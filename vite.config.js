import { sveltekit } from '@sveltejs/kit/vite'
import { presetWebFonts, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
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
