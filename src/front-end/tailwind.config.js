/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          pink: "rgb(103, 23, 74)",
          black: "rgb(28, 26, 31)",
          blue: "rgb(30, 30, 116)",
        },
        light: {
          pink: "rgb(218, 2, 221)",
          white: "rgb(240, 240, 240)",
          blue: "rgb(18, 130, 184)",
        },
      },
      backgroundImage: {
        pattern: 'url(/bg1.png)',
      },
      fontFamily: {
        sans: 'Inter',
      },
      boxShadow: {
				shape:
					'0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)',
			},
    },
  },
  plugins: [],
}