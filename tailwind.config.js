/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
        // Tons de rosa claro
        'pink-lightest': 'oklch(95.00% 0.04 350.50)',
        'pink-light':    'oklch(69.00% 0.16 350.00)',
        // Tons de azul/ciano
        'cyan-light':    'oklch(89.00% 0.08 184.00)',
        'mint':          'oklch(80.00% 0.11 182.00)',
        'teal':          'oklch(62.00% 0.14 180.00)',
      }},
  },
  plugins: [],
}