import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://47.99.134.126:7008'
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
      router: fileURLToPath(new URL('./src/router', import.meta.url)),
      stores: fileURLToPath(new URL('./src/stores', import.meta.url))
    }
  }
})
