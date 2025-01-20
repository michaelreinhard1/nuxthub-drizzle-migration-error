export default defineNuxtConfig({
  modules: ['@nuxthub/core', 'nuxt-auth-utils', '@nuxt/eslint'],
  imports: {
    dirs: ['../shared/utils', '../shared/types', '../shared/constants'],
  },
  devtools: {
    enabled: true,
  },
  sourcemap: { client: 'hidden' },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-11',
  nitro: {
    imports: {
      dirs: ['../shared/utils', '../shared/types', '../shared/constants'],
    },
  },
  hub: {
    database: true,
  },
  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never',
      },
    },
  },
});
