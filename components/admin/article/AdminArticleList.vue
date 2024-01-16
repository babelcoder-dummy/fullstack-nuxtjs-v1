<script setup lang="ts">
import type { Component } from 'vue'
import type { ArticleItem } from '~/server/api/articles/index.get'
import ArticleDetails from '~/components/article/ArticleDetails.vue'
import AdminUpdateArticle from '~/components/admin/article/AdminUpdateArticle.vue'
import AdminCreateArticle from '~/components/admin/article/AdminCreateArticle.vue'

const { data: articles, status } = await useFetch('/api/articles')
const isOpen = ref(false)
const selectedSlug = ref<string>()
const displayComponent = shallowRef<Component>()
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'actions' },
]

function items(row: ArticleItem) {
  return [
    [
      {
        label: 'Details',
        icon: 'i-heroicons-document-magnifying-glass',
        click() {
          isOpen.value = true
          selectedSlug.value = row.slug
          displayComponent.value = ArticleDetails
        },
      },
      {
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click() {
          isOpen.value = true
          selectedSlug.value = row.slug
          displayComponent.value = AdminUpdateArticle
        },
      },
    ],
    [
      {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click() {},
      },
    ],
  ]
}

function openCreateArticle() {
  isOpen.value = true
  displayComponent.value = AdminCreateArticle
}

function handleSuccess() {
  isOpen.value = false
}
</script>

<template>
  <div v-if="status === 'pending'">
    Loading...
  </div>
  <div v-else-if="!articles">
    No article found
  </div>
  <template v-else>
    <UTable :columns="columns" :rows="articles">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <USlideover v-model="isOpen">
      <div class="p-4 overflow-auto">
        <component :is="displayComponent" :slug="selectedSlug" @success="handleSuccess" />
      </div>
    </USlideover>
    <UButton
      icon="i-heroicons-plus"
      size="xl"
      color="primary"
      square
      variant="solid"
      class="fixed bottom-4 right-4 rounded-full"
      @click="openCreateArticle"
    />
  </template>
</template>
