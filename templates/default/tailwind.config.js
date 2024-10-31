// TODO: import tailwindConfig from "@htsc/ui/tailwind-config";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			maxHeight: {
				98: "28rem"
			}
		},
		screens: {
			xs: { min: "320px", max: "639px" },
			// => @media (min-width: 320px and max-width: 639px) { ... }
			sm: { min: "640px", max: "767px" },
			// => @media (min-width: 640px and max-width: 767px) { ... }
			md: { min: "768px", max: "1023px" },
			// => @media (min-width: 768px and max-width: 1023px) { ... }
			lg: { min: "1024px" }
			// => @media (min-width: 1024px) { ... }
		}
	}
};
