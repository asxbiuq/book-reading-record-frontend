import { configDefaults,defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    environment: 'jsdom',
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
})