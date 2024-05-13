import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/maps ",
  plugins: [vue({
    include: [/\.vue$/, /\.md$/],
  }),
  quasar({
    sassVariables: 'src/quasar-variables.sass'
  }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
      "@/": `${path.resolve(__dirname, "src")}/`,
      "@assets": `${path.resolve(__dirname, "src/assets")}/`
    },
  },
})
