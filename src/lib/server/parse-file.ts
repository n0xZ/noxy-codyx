export const parseFileToBase64 = async (f: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onloadend = () => {
			const base64String = reader.result as string // FileReader.result is typed as `string | ArrayBuffer`
			const base64Data = base64String.split(',')[1] // Remove the data URL scheme part
			resolve(base64Data)
		}

		reader.onerror = () => {
			reject(reader.error)
		}

		reader.readAsDataURL(f)
	})
}
