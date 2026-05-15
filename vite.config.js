import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    assetsDir: './assets'
  },
  resolve: {
    alias: {
      '@styles': '/src/assets/styles',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@hooks': '/src/hooks',
      '@type': '/src/types',
      '@template': '/src/config/template.json',
    },
  },
})
