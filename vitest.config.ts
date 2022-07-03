import { configDefaults,defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { Url } from 'url'

export default defineConfig({
  test: {
    globals: true,
    // exclude: [...configDefaults.exclude, 'packages/template/*'],
    environment: 'jsdom',
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      composables: fileURLToPath(new URL('./src/composables', import.meta.url)),
      styles: fileURLToPath(new URL('./src/styles', import.meta.url)),
      plugins: fileURLToPath(new URL('./src/plugins', import.meta.url)),
      views: fileURLToPath(new URL('./src/views', import.meta.url)),
      layouts: fileURLToPath(new URL('./src/layouts', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
      apis: fileURLToPath(new URL('./src/apis', import.meta.url)),
      dirs: fileURLToPath(new URL('./src/dirs', import.meta.url)),
      store: fileURLToPath(new URL('./src/store', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
    },
  },
})