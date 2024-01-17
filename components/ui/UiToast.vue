<script setup lang="ts">
const store = useUiStore()
const { toast } = storeToRefs(store)
const { clearToast } = store
</script>

<template>
  <UAlert
    v-if="toast"
    :color="toast.type === 'success' ? 'primary' : 'rose'"
    variant="solid"
    :title="toast.title"
    :description="toast.message"
    class="my-4"
    :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
    @close="clearToast"
  />
</template>
