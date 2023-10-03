import crypto, { createDecipheriv } from 'node:crypto'

const algoritm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

function encryptIdentifier (identifier) {
  const cipher = crypto.createCipheriv(algoritm, key, iv)
  let encrypted = cipher.update(identifier, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const link = `http://localhost:3000/open-file?file=${encodeURIComponent(encrypted)}`
  return link
}

function descryptIdentifier (identifier) {
  const decipher = createDecipheriv(algoritm, key, iv)
  let descrypted = decipher.update(identifier, 'hex', 'utf8')
  descrypted += decipher.final('utf8')
  return descrypted.toString()
}

const identifier = 'xdxddssddsxsdsdxsdsdsd'
const encrypted = encryptIdentifier(identifier)

console.log(encrypted)
const id = encrypted.split('=').pop()
console.log(id)
const decrypted = descryptIdentifier(id)
console.log(decrypted)

export default encryptIdentifier
