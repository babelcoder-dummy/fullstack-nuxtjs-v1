export function useInterval(ms: number) {
  const count = ref(0)

  const interval = setInterval(() => {
    count.value++
  }, ms)

  onUnmounted(() => {
    clearInterval(interval)
  })

  return count
}
