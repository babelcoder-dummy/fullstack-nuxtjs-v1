<script setup lang="ts">
const links = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-squares-2x2',
    to: '/admin/dashboard',
  },
  {
    label: 'Users',
    icon: 'i-heroicons-users',
    to: '/admin/users',
  },
  {
    label: 'Articles',
    icon: 'i-heroicons-book-open',
    to: '/admin/articles',
  },
  {
    label: 'Announcements',
    icon: 'i-heroicons-bell-alert',
    to: '/admin/announcements',
  },
  {
    label: 'Leaves',
    icon: 'i-heroicons-queue-list',
    to: '/admin/leaves',
  },
]
</script>

<template>
  <UiHeader />
  <div class="flex flex-col h-screen">
    <div class="my-4 w-full flex-1">
      <div class="flex gap-4 h-full max-h-full">
        <UiToast />
        <UVerticalNavigation :links="links" class="border-r min-h-full pr-4" />
        <div class="overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
