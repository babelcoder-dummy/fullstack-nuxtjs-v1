<script setup lang="ts" generic="K extends 'register' | 'login'">
import type { FormSubmitEvent } from '#ui/types'
import { loginInputValidator, registerInputValidator } from '~/validators/auth'
import type { RegisterInput } from '~/server/api/auth/register.post'
import type { LoginInput } from '~/server/api/auth/login.post'

interface Props {
  kind: K
}
type EmitData = K extends 'register' ? RegisterInput : LoginInput

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'submit', credentials: EmitData): void
}>()
const title = useCapitalize(props.kind)
const isRegisterForm = props.kind === 'register'
const altLinkText = isRegisterForm ? 'Login' : 'Register'
const altLink = isRegisterForm ? '/auth/login' : '/auth/register'
const state = reactive(isRegisterForm
  ? {
      email: undefined,
      password: undefined,
      name: undefined,
    }
  : {
      email: undefined,
      password: undefined,
    })
const schema = isRegisterForm ? registerInputValidator : loginInputValidator

function onSubmit(event: FormSubmitEvent<EmitData>) {
  emit('submit', event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4 max-w-lg mx-auto" @submit="onSubmit">
    <h1 class="text-center text-3xl font-bold">
      {{ title }}
    </h1>
    <UFormGroup v-if="isRegisterForm" label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <div class="flex justify-between items-center">
      <UButton type="submit">
        {{ title }}
      </UButton>
      <UButton variant="outline" :to="altLink">
        {{ altLinkText }}
      </UButton>
    </div>
  </UForm>
</template>
