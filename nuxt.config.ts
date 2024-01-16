// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  telemetry: false,
  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-lodash'],
  routeRules: {
    '/admin': { redirect: '/admin/dashboard' },
    '/leaves': { ssr: false },
    '/announcements': { prerender: true },
    '/articles': { swr: 15 },
  },
  nitro: {
    prerender: {
      routes: ['/announcements/succurro-sopor-celer-vulgaris'],
    },
  },
  colorMode: {
    preference: 'light',
  },
  ui: {
    icons: ['heroicons', 'el'],
  },
})
