export function usePageTitle(title: Ref<string>) {
  watchEffect(() => {
    if (process.client)
      document.title = title.value
  })
}
