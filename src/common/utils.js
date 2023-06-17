import { fileURLToPath } from 'url'
import { dirname as dir } from 'path'

export function dirname(meta) {
  const __filename = fileURLToPath(meta.url)
  const __dirname = dir(__filename)

  return { __dirname, __filename }
}
