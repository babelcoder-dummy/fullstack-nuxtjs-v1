// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  routeRules: {
    '/admin': { redirect: '/admin/dashboard' },
  },
})
