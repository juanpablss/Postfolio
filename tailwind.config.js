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
          900: "#010030",
          700: "#160078",
          500: "#7226FF",
        },
        light: {
          900: "#F042FF",
          500: "#FFE5F1",
          300: "#87F5F5",
        },
      },
      // backgroundImage: {
      
      // },
      backgroundImage: {
        // pattern: 'url(/public/bg.jpg)', consertar backround
        "dark-gradient": "linear-gradient(to bottom, oklch(0.293 0.066 243.157), #160078)",
        "light-gradient": "linear-gradient(to bottom, #FFE5F1, #87F5F5)",
        // 'card-bg': "url('/bg.jpg')",
        'card-bg': "url('/bg.jpg')",
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