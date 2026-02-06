/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#189AB4", // Blue Grotto / Sea Teal
                secondary: "#05445E", // Navy Blue / Deep Ocean
                "nature-light": "#EAF6F6", // Light Aqua Mist (formerly soft mist)
                "nature-dark": "#05445E", // Deep Ocean (formerly forest green)
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
