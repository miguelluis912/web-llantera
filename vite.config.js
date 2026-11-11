import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const root = new URL('./', import.meta.url)
const pages = readdirSync(root)
  .filter((file) => file.endsWith('.html'))
  .map((file) => fileURLToPath(new URL(file, root)))

export default defineConfig({
  base: './',
  plugins: [tailwindcss(), vue({ template: { transformAssetUrls: false } })],
  build: {
    rolldownOptions: { input: pages },
  },
})
