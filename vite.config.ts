import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',  // ✅ ensures correct relative imports for JS/CSS when hosted
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
})
