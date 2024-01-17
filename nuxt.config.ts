// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['@vuepic/vue-datepicker', 'jsonwebtoken'],
  },
  telemetry: false,
  modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-lodash', '@sidebase/nuxt-auth', '@pinia/nuxt'],
  routeRules: {
    '/admin': { redirect: '/admin/dashboard' },
    '/leaves': { ssr: false },
    '/announcements': { prerender: true },
    '/articles': { swr: 15 },
  },
  runtimeConfig: {
    accessToken: {
      expiresIn: '30m',
      secretKey: '',
    },
    public: {
      baseUrl: '',
    },
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
  image: {
    domains: ['localhost'],
  },
  auth: {
    provider: {
      type: 'local',
      pages: {
        login: '/auth/login',
      },
      endpoints: {
        getSession: { path: '/profile' },
        signOut: { method: 'delete' },
      },
      token: {
        signInResponseTokenPointer: '/token/accessToken',
        maxAgeInSeconds: 7 * 24 * 60 * 60,
      },
      sessionDataType: {
        id: 'string',
        email: 'string',
        name: 'string',
        role: 'ADMIN | MANAGER | MEMBER',
        image: 'string',
      },
    },
  },
})
