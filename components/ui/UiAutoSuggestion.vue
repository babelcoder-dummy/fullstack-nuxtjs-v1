<script setup lang="ts" generic="T extends { title: string }">
interface Props {
  items?: T[]
}

const { items } = withDefaults(defineProps<Props>(), {
  items: () => [],
})
const keyword = ref('')
const suggestedItems = computed(() => items?.filter(i => i.title.includes(keyword.value)))
</script>

<template>
  <input v-model="keyword" type="text">
  <div v-for="item of suggestedItems" :key="item.title">
    {{ item.title }}
  </div>
</template>
