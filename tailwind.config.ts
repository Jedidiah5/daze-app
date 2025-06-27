/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FFA800',
					text: '#FFA800',
					button: '#FFA800',
				},
				background: {
					DEFAULT: '#181514',
					light: '#FAFAFA',
				},
				secondary: {
					DEFAULT: '#272728',
					text: '#343030',
				},
				border: '#DCDCDC',
			},
		},
	},
};
