<script setup lang="ts">
import { permissionFor } from '~/middleware/permission'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', permissionFor(['ADMIN', 'MANAGER'])],
})
</script>

<template>
  <AdminArticleList />
</template>
