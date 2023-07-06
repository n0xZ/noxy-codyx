import { expect, test } from '@playwright/test'

test.describe('Share Recommendation page integration test case', () => {
	test('should be able to display a 404 if querying user with param.id does not exist', async ({
		page,
	}) => {
		const BASE_URL = process.env.PLAYWRIGHT_BASE_URL
		const location = await page.goto(`${BASE_URL}/recommendations/share/null`)
		expect(location?.status()).toBe(404)
	}),
		test('should be able to a 200 if user query matches with the actual param', async ({
			page,
		}) => {
			const BASE_URL = process.env.PLAYWRIGHT_BASE_URL
			const MOCK_USER_ID = process.env.PLAYWRIGHT_MOCK_USER_ID
			const location = await page.goto(
				`${BASE_URL}/recommendations/share/${MOCK_USER_ID}`
			)
			expect(location?.status()).toBe(200)
		})
})
