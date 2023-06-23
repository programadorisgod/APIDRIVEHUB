import fs from 'fs'
export default function verifyFileExist (path) {
  try {
    fs.accessSync(path)
    return true
  } catch (e) {
    return false
  }
}
