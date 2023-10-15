import fs from 'fs/promises'
export default async function verifyFileExist (path) {
  try {
    await fs.access(path)
    return true
  } catch (e) {
    return false
  }
}
