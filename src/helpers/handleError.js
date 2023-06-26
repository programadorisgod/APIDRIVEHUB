import { MongooseError } from 'mongoose'

class myError extends Error {
  constructor (name, statusCode) {
    super(name)
    this.name = name
    this.statusCode = statusCode
  }
}

export const httpError = (error, res) => {
  let statusCode = 500
  let name = 'An internal error ocurred'

  if (error instanceof myError) {
    statusCode = error.statusCode
    name = error.name
  }
  if (error instanceof SyntaxError) {
    statusCode = 400
    name = 'Invalid JSON'
  }
  if (error instanceof MongooseError) {
    statusCode = 500
    name = 'Erro in the DB mongoose'
  }

  res.status(statusCode).json({ message: name })
}
