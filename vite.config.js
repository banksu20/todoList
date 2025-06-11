import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueform from '@vueform/vueform/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueform()],
})
