import { configDefaults,defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
  plugins: [
    AutoImport({
      imports: ['vitest'],
      dts: true,
    }),
  ],
})