<script setup lang="ts">
import type { AnnouncementList } from '~/server/api/announcements/index.get'

const { announcements } = defineProps<{ announcements: AnnouncementList }>()
const navigateToDetailsPage = (slug: string) => navigateTo(`/announcements/${slug}`)
</script>

<template>
  <h1 class="text-center text-4xl my-4">
    Announcement List
  </h1>
  <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <UCard v-for="announcement of announcements" :key="announcement.id" class="cursor-pointer" @click="navigateToDetailsPage(announcement.slug)">
      <template #header>
        <h3 class="text-lg font-bold">
          {{ announcement.title }}
        </h3>
      </template>
      <p>
        {{ announcement.excerpt }}
      </p>
    </UCard>
  </section>
</template>
