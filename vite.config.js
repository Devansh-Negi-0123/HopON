import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/geocode": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/route": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/rides": {
        target: "http://localhost:5000",
        changeOrigin: true,
      }
    }
  }
})
