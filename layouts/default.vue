<script setup lang="ts">
const image = useGetImagePath('/assets/images/absence-management.jpg')

useSeoMeta({
  title: 'Absence Management',
  ogTitle: 'Absence Management',
  description: 'A website for managing employee leaves of absence',
  ogDescription: 'A website for managing employee leaves of absence',
  ogImage: image,
})
</script>

<template>
  <UiHeader />
  <UContainer class="my-4">
    <UiToast />
    <slot />
  </UContainer>
</template>
