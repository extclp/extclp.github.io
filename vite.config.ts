import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import { resolve } from "path";

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
    })
  ]
})
