export function useLocalStorage<T>(key: string) {
  const state = ref<T>()

  onMounted(() => {
    const item = localStorage.getItem(key)

    try {
      const value = (item ? JSON.parse(item) : undefined) as T
      state.value = value
    }
    catch {
      state.value = item as T
    }
  })

  watch(state, (newState) => {
    localStorage.setItem(
      key,
      typeof newState === 'object'
        ? JSON.stringify(newState)
        : String(newState),
    )
  })

  return { value: state }
}
