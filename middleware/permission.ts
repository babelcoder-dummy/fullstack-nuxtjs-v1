import type { RouteMiddleware } from 'nuxt/app'

export function permissionFor(roles: ('ADMIN' | 'MANAGER' | 'MEMBER')[]): RouteMiddleware {
  return (to, from) => {
    const { data: user } = useAuth()

    if (!user.value)
      return navigateTo('/auth/login')
    if (!roles.includes(user.value.role))
      return from.path === to.path ? navigateTo('/') : abortNavigation()
  }
}
