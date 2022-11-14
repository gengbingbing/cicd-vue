/*
 * @Author: bingbing.geng
 * @Date: 2022-11-07 13:22:38
 * @LastEditTime: 2022-11-14 08:55:15
 * @FilePath: \cicd-vue\vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://www.bingyun.top/',
        changeOrigin: true,
//         rewrite: path => {
//           return path.replace(/^\/api/, '')
//         }
      }
    }
  }
})
