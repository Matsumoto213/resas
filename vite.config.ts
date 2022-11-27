import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  base: './',
  root: './src',
  publicDir: '../public',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
})
