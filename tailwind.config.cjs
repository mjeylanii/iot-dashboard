/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui'), require('tailwindcss-hero-patterns')],
	daisyui: {
		themes: true,
		themes: ['corporate'],
		utils: true,
		logs: true,
		base: false,
		prefix: ''
	}
};
