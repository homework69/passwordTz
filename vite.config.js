import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/passwordTz/',
  resolve:{
    alias:{
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    devSourcemap: true
  },
  productionSourceMap: false
})
