import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Toast {
  type: 'success' | 'error'
  title: string
  message: string
}

export const useUiStore = defineStore('ui', () => {
  const toast = ref<Toast | null>(null)
  const clearToast = () => toast.value = null
  const setToast = (newToast: Toast) => {
    toast.value = newToast

    setTimeout(() => {
      clearToast()
    }, 3_000)
  }

  return {
    toast,
    clearToast,
    setToast,
  }
})
