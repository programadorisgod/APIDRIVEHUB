import fs from 'fs'
export default function verifyFileExist (path) {
  try {
    fs.existsSync(path)
    return true
  } catch (e) {
    return false
  }
}
