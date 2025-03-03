import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: {
      // "@": path.resolve(__dirname, "./src/*"),
      
      //misc
      '@styles':'/src/assets/styles',

      //Components
      '@ui':'/src/ui',

      '@components': '/src/ui/components',
      '@containers': '/src/ui/containers',
      '@pages': '/src/ui/pages',
      '@utils': '/src/utils',

      //configurations
      '@user_conf': '/src/utils/get_preferences',
      '@template': '/src/config/template',
    },
  },
})
