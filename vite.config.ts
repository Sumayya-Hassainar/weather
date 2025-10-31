import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    // Optional: increase or silence the large chunk warning
    chunkSizeWarningLimit: 1000, // or 2000 if your app is large
    sourcemap: false, // optional: omit source maps for smaller builds
  },
})
