<script setup lang="ts">
const { image } = defineProps<{ image?: string }>()
const emit = defineEmits<{
  (e: 'submit', image: File): void
}>()
const previewImage = ref<string | undefined>(image)
const fileInput = ref<HTMLInputElement | null>(null)

function uploadImage(event: HTMLInputEvent) {
  const file = event.target.files?.[0]

  if (!file)
    return

  const image = URL.createObjectURL(file)
  previewImage.value = image
  emit('submit', file)
}
</script>

<template>
  <img v-if="previewImage" :src="previewImage" class="h-[300px] w-full">
  <img v-else src="/assets/images/no-image.png" class="h-[300px] w-full">
  <input ref="fileInput" type="file" class="hidden" @input="uploadImage($event as HTMLInputEvent)">
  <UButton variant="outline" class="w-full my-4" @click="fileInput?.click()">
    Select File
  </UButton>
</template>
