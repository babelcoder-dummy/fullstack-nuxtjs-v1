<script setup lang="ts">
import type { LeaveStatus } from '@prisma/client'
import type { LeaveList } from '~/server/api/leaves.get'

const { leaves } = defineProps<{ leaves: LeaveList }>()

function statusColor(status: LeaveStatus) {
  switch (status) {
    case 'APPROVED':
      return 'primary'
    case 'PENDING':
      return 'yellow'
    case 'REJECTED':
      return 'rose'
  }
}
</script>

<template>
  <h1 class="text-center text-4xl my-4">
    All Leaves
  </h1>
  <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <UCard v-for="leave of leaves" :key="leave.id" class="cursor-pointer">
      <template #header>
        <UBadge :color="statusColor(leave.status)">
          {{ leave.status }}
        </UBadge>
      </template>
      <p class="mt-auto">
        {{ leave.reason }}
      </p>
      <template v-if="leave.rejectionReason" #footer>
        {{ leave.rejectionReason }}
      </template>
    </UCard>
  </section>
</template>
