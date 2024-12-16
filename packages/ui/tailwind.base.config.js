/** @type {import('tailwindcss').Config} */
export const tailwindConfig = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@agribank/ui/dist/components/**/*.{jsx,tsx,js,ts}"
	]
};

export default tailwindConfig;
