import crypto, { createDecipheriv } from 'node:crypto'

import { settings } from '../config/env/varaibles.js'

const algoritm = 'aes-256-cbc'

function encrypt({ text }) {
  const iv = crypto.randomBytes(16)

  const key = Buffer.from(settings.KEY, 'hex')

  const cipher = crypto.createCipheriv(algoritm, key, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')

  encrypted += cipher.final('hex')

  const result = iv.toString('hex') + ':' + encrypted

  return result
}

function createHash(identifier) {
  const hash = crypto.createHash('sha256', settings.SECRET_HASH)
  hash.update(identifier)
  return hash.digest('hex')
}

function descryptIdentifier(encryptedIdentifier) {
  const [ivHex, encryptedText] = encryptedIdentifier.split(':')

  const iv = Buffer.from(ivHex, 'hex')

  const key = Buffer.from(settings.KEY, 'hex')

  const decipher = createDecipheriv(algoritm, key, iv)

  let descrypted = decipher.update(encryptedText, 'hex', 'utf8')

  descrypted += decipher.final('utf8')

  return descrypted.toString()
}

export { encrypt, descryptIdentifier, createHash }
