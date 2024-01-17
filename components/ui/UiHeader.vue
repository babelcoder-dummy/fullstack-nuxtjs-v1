<script setup lang="ts">
const { data: user, status, signOut } = useAuth()
const currentAvatar = computed(() => user.value?.image ? useGetImagePath(user.value.image) : undefined)
const isAdmin = computed(() => ['ADMIN', 'MANAGER'].includes(user.value?.role))
const authMenuItems = [
  [
    {
      label: 'Profile',
      icon: 'i-el-adult',
      click() {
        navigateTo('/auth/profile')
      },
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-el-remove',
      click() {
        signOut({ redirect: true, callbackUrl: '/auth/login' })
      },
    },
  ],
]

const { data: contentNavigation } = await useAsyncData('navigation', () => fetchContentNavigation())
</script>

<template>
  <header class="flex h-16 border-b p-4 items-center">
    <ULink to="/">
      <UAvatar src="/assets/images/logo.png" size="md" alt="Logo" />
    </ULink>
    <ULink v-if="isAdmin" to="/admin" active-class="text-primary" class="mx-4">
      Admin
    </ULink>
    <ULink to="/leaves" active-class="text-primary" class="mx-4">
      Leaves
    </ULink>
    <ULink to="/articles" active-class="text-primary" class="mx-4">
      Articles
    </ULink>
    <ULink to="/announcements" active-class="text-primary" class="mx-4">
      Announcements
    </ULink>
    <ULink
      v-for="item of contentNavigation"
      :key="item._path"
      :to="item._path"
      active-class="text-primary"
      class="mx-4"
    >
      {{ item.title }}
    </ULink>
    <UDropdown
      v-if="status === 'authenticated'"
      :items="authMenuItems"
      :ui="{ item: { disabled: 'cursor-text select-text' } }"
      :popper="{ placement: 'bottom-start' }"
      class="mx-4 ml-auto"
    >
      <UAvatar :src="currentAvatar" />
      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </template>
    </UDropdown>
    <ULink v-else to="/auth/login" active-class="text-primary" class="mr-4 ml-auto">
      Login
    </ULink>
  </header>
</template>
