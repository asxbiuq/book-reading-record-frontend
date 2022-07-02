import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { fileURLToPath } from 'url'
import { Url } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  // assetsInclude: ['**/*.jfif'],
  plugins: [
    vue({
      //$语法糖
      reactivityTransform: true,
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        '@vueuse/core',
        // custom
        {
          // '@vueuse/core': [
          //   // named imports
          //   'useMouse', // import { useMouse } from '@vueuse/core',
          //   // alias
          //   ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          // ],
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
          // "[package-name]": [
          //   "[import-names]",
          //   // alias
          //   ["[from]", "[alias]"],
          // ],
        },
      ],

      // Auto import for all module exports under directories
      dirs: [
        'src/hooks',
        'src/composables',
        'src/views',
        'src/store',
        'src/api',
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: './auto-imports.d.ts',

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15
      vueTemplate: true,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ],

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      // relative paths to the directory to search for components.
      dirs: ['src/components', 'src/pages', '@iconify/vue'],

      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,
      // resolvers for custom components
      resolvers: [HeadlessUiResolver(), IconsResolver()],

      // generate `components.d.ts` global declarations,
      // also accepts a path for custom filename
      // default: `true` if package typescript is installed
      dts: false,

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: false,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],

      // auto import for directives
      // default: `true` for Vue 3, `false` for Vue 2
      // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
      // To install Babel, run: `npm install -D @babel/parser @babel/traverse`
      directives: true,

      // Transform path before resolving
      importPathTransform: (v) => v,

      // Allow for components to override other components with the same name
      allowOverrides: false,

      // filters for transforming targets
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
    }),
    Pages({
      dirs: 'src/pages', // File directory where routing needs to be generated
      exclude: ['**/components/*.vue'], // Excluded directories, i.e. the directories under all components directories are not included vue file generation route
    }),
    Layouts({
      defaultLayout: 'default',
    }),
    Icons({ autoInstall: true }),
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
    },
  },
})
