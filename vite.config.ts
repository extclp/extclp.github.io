import { defineConfig } from "vite"
import { resolve } from "path";
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve("src")
    }
  },
  define: {
    __FEATURE_OPTIONS_API__: false
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"]
    }),
    Components({
      dts: false,
      resolvers: [VantResolver()]
    })
  ]
})
