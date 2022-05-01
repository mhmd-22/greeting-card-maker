
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
            colors: {
                primary: {
                    1: "var(--primary-1)",
                    2: "var(--primary-2)",
                    3: "var(--primary-3)",
                    4: "var(--primary-4)",
                },
                base: {
                    1: "#fdfbf7"
                }
            },
        }
	},

	plugins: []
};

module.exports = config;
