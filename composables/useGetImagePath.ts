import { z } from 'zod'

export function useGetImagePath(file: string) {
  const { public: { baseUrl } } = useRuntimeConfig()

  const result = z.string().url().safeParse(file)
  if (result.success)
    return file

  return `${baseUrl}${file}`
}
