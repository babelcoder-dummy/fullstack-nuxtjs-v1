import path from 'node:path'
import { readFile } from 'node:fs/promises'

export default eventHandler(async (event) => {
  const filePath = getRouterParam(event, 'path')!
  const file = await readFile(
    path.join(path.resolve(), 'public', 'uploads', filePath),
  )

  return file
})
