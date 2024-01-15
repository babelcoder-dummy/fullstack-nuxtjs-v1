// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  modules: ['@nuxt/ui', "@nuxt/image"],
  routeRules: {
    '/admin': { redirect: '/admin/dashboard' },
  },
  colorMode: {
    preference: 'light',
  },
  ui: {
    icons: ['heroicons', 'el'],
  },
})