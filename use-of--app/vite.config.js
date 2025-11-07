import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line scans all relevant files in your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss(),
  ],
})