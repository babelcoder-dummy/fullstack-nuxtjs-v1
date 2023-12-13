<script setup lang="ts">
const { data: leaves } = await useFetch('/api/leaves')
</script>

<template>
  <h1>Leave List</h1>
  <ul>
    <li v-for="leave of leaves" :key="leave.id">
      <NuxtLink :to="`/leaves/${leave.id}`">
        {{ leave.reason }}
      </NuxtLink>
    </li>
  </ul>
</template>
