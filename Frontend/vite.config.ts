import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true, // Assurez-vous que les sourcemaps sont activés
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/custom_style.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
