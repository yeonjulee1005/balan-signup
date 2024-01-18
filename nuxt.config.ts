// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  app: {
    pageTransition: { name: 'balan', mode: 'out-in' }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  css: [
    '~/styles/index.scss'
  ],
  ui: {
    prefix: 'BL'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: true
    }
  ],
  imports: {
    dirs: [
      'composables/**',
      'stores/**'
    ]
  },
  i18n: {
    langDir: './locales',
    locales: [
      { code: 'ko', file: 'ko.ts' },
      { code: 'en', file: 'en.ts' }
    ],
    defaultLocale: 'ko',
    strategy: 'no_prefix'
  },

  vite: {
    build: {
      sourcemap: true,
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  },
  pinia: {
    storesDirs: [
      './stores/**'
    ]
  },
  stylelint: {
    lintOnStart: true
  },
  typescript: {
    shim: false
  }
})
