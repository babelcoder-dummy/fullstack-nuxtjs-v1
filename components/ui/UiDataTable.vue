<script setup lang="ts" generic="T extends { id: number }">
export interface Column<R> {
  name: string
  field: keyof R
}

interface Props {
  title?: string
  columns: Column<T>[]
  rows?: T[]
}

const { title, columns, rows } = withDefaults(defineProps<Props>(), {
  title: 'Data Table',
  rows: () => [],
})

const emit = defineEmits<{
  (e: 'trigger', row: T): void
}>()
</script>

<template>
  <h1>
    {{ title }}
  </h1>
  <table>
    <thead>
      <tr>
        <td v-for="col of columns" :key="col.field">
          {{ col.name }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row of rows" :key="row.id" @click="emit('trigger', row)">
        <td v-for="col of columns" :key="col.field">
          {{ row[col.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
