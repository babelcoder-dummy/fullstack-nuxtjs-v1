<script setup lang="ts" generic="K extends 'create' | 'edit'">
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import DatePicker from '@vuepic/vue-datepicker'
import type { LeaveDetails } from '~/server/api/leaves/[id].get'
import type { UpdateLeaveInput } from '~/server/api/leaves/[id].patch'
import type { CreateLeaveInput } from '~/server/api/leaves/index.post'
import { createLeaveInputValidator, updateLeaveInputValidator } from '~/validators/leaves'
import '@vuepic/vue-datepicker/dist/main.css'

interface Props {
  kind: K
  leave?: LeaveDetails
}
type EmitData = K extends 'create' ? CreateLeaveInput : UpdateLeaveInput

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'submit', form: EmitData): void
}>()
const title = useCapitalize(props.kind)
const schema = props.kind === 'create' ? createLeaveInputValidator : updateLeaveInputValidator
const leaveDate = ref(props.leave?.leaveDate ? new Date(props.leave.leaveDate) : new Date())
const state = reactive(props.leave ?? {
  reason: undefined,
  leaveDate: new Date().toISOString(),
})

watch(leaveDate, date => state.leaveDate = date?.toISOString())

async function onSubmit(event: FormSubmitEvent<EmitData>) {
  emit('submit', event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 max-w-lg mx-auto" @submit="onSubmit">
    <h1 class="text-center text-3xl font-bold">
      {{ title }}
    </h1>

    <UFormGroup label="Leave Date" name="leaveDate">
      <ClientOnly>
        <DatePicker v-model="leaveDate" locale="th" :enable-time-picker="false" />
      </ClientOnly>
    </UFormGroup>

    <UFormGroup label="Reason" name="reason">
      <UTextarea v-model="state.reason" />
    </UFormGroup>

    <UButton type="submit">
      {{ title }}
    </UButton>
  </UForm>
</template>
