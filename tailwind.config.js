/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	safelist: [
		{
			pattern:
				/bg-(brand|pink|purple|blue|rose|gray|)-(50|100|200|400|800)/,
			variants: ["hover"],
		},
		{
			pattern:
				/text-(brand|pink|purple|blue|rose|gray|)-(50|100|200|400|700)/,
			variants: ["hover"],
		},
		{
			pattern: /border-(brand|pink|purple|blue|rose|gray|)-(200|400)/,
			variants: ["hover"],
		},
		{
			pattern: /fill-(brand|pink|purple|blue|rose|gray|)-400/,
			variants: ["hover"],
		},
	],
	theme: {
		extend: {
			colors: {
				brand: {
					50: "#E7E9F3",
					100: "#D0D3E7",
					200: "#A0A7CF",
					300: "#747EB9",
					400: "#4D5899",
					500: "#353D69",
					600: "#2B3155",
					700: "#212540",
					800: "#151829",
					900: "#0A0C14",
				},
			},
		},
	},
	plugins: [
		require("tailwind-scrollbar"),
		plugin(({ addUtilities }) => {
			addUtilities(
				{
					".scrollbar-hide": {
						/* IE and Edge */
						"-ms-overflow-style": "none",
						/* Firefox */
						"scrollbar-width": "none",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},
					".scrollbar": {
						/* IE and Edge */
						"-ms-overflow-style": "auto",
						/* Firefox */
						"scrollbar-width": "auto",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "block",
							width: "6px",
							height: "6px",
						},
						"&::-webkit-scrollbar-track": {
							background: "transparent",
						},

						"&::-webkit-scrollbar-thumb": {
							background: "#888",
							borderRadius: "35px",
						},

						"&::-webkit-scrollbar-thumb:hover": {
							background: "#555",
						},
					},
				},
				["responsive"]
			);
		}),
	],
	variants: {
		scrollbar: ["rounded"],
	},
};
