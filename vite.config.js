import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',  // GitHub Pages 路径
  build: {
    outDir: 'dist'
  }
})