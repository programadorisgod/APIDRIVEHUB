import z from 'zod'

const enviromentVariables = z.object({
  CONEXION_STRING_DATABASE: z
    .string()
    .trim()
    .min(30)
    .default(
      'mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority'
    ),
  CONEXION_STRING_DATABASE_DEVELOPMENT: z
    .string()
    .trim()
    .min(30)
    .default(
      'mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority'
    ),
  SECRET_KEY: z.string().trim().min(10),
  SECRET_HASH: z.string().trim().min(10),
  PRIVATE_EMAIL: z.email().nonempty(),
  PRIVATE_PASSWORD: z.string().min(12).max(16),
  NODE_ENV: z.enum(['development', 'production', 'test']).default(['development']),
  HOST: z.string().nonempty(),
  PORT: z.string().min(4).max(6),
  KEY: z.string().nonempty(),
})

const { success, error, data } = enviromentVariables.safeParse(process.env)

if (!success) throw new Error('Missing enviroment variables', { cause: error })

const {
  CONEXION_STRING_DATABASE,
  CONEXION_STRING_DATABASE_DEVELOPMENT,
  SECRET_KEY,
  SECRET_HASH,
  PRIVATE_EMAIL,
  PRIVATE_PASSWORD,
  NODE_ENV,
  HOST,
  PORT,
  KEY,
} = data

const DATABASE_URL = NODE_ENV === 'production' ? CONEXION_STRING_DATABASE : CONEXION_STRING_DATABASE_DEVELOPMENT

export const settings = Object.freeze({
  SECRET_KEY,
  SECRET_HASH,
  PRIVATE_EMAIL,
  PRIVATE_PASSWORD,
  NODE_ENV,
  DATABASE_URL,
  HOST,
  PORT,
  KEY,
})
