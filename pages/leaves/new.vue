<script setup lang="ts">
import type { CreateLeaveInput } from '~/server/api/leaves/index.post'

function handleSubmit(form: CreateLeaveInput) {
  console.log(form)
}
</script>

<template>
  <LeaveForm kind="create" @submit="handleSubmit" />
</template>
