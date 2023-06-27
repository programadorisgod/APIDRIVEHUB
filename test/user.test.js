import { app, Server } from '../index.js'
import request from 'supertest'
/** Importamos el modelo de usuario y la libreria para generar datos fakes */
import UserModel from '../src/models /user.js'
import mongoose from 'mongoose'
import Chance from 'chance'

const chance = new Chance()
const api = request(app)

/** Despues de todas las pruebas, cerramos la conexion a la base de datos */
afterAll(async () => {
  await mongoose.connection.close()
  Server.close()
})

/** Antes de cada prueba, borramos todos los documentos de la coleccion */
beforeEach(async () => {
  await UserModel.deleteMany({})

  const user = new UserModel({
    avatar: 'userDefault.png',
    userName: chance.name(),
    email: chance.email(),
    password: chance.string({ length: 10 })
  })

  await user.save()
})

describe.skip('GET /user/:userName', () => {
  // En caso normal
  it('should return a user by userName', async () => {
    // creamos al usuario con datos falsos y lo guardamos
    const user = new UserModel({
      avatar: 'userDefault.png',
      userName: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 10 })
    })

    await user.save()

    // Ahora hacemos la peticion
    await api.get(`/api/users/${user.userName}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        user: {
          _id: user._id.toString(),
          avatar: 'localhost:4000/api/files/avatars/userDefault.png',
          userName: user.userName,
          email: user.email,
          password: user.password,
          directories: user.directories
        }

      })
  })

  it('should return error authorization if not token', async () => {
    await api.get('/api/users/Brett')
      .expect(203)
      .expect('Content-Type', /json/)
      .expect({ error: 'You dont have authoriaztion' })
  })
})

describe('POST /users/create', () => {
  it('should create new user and return it', async () => {
    // creamos al usuario con datos falsos y lo guardamos
    const userData = {
      avatar: 'userDefault.png',
      userName: chance.name(),
      email: chance.email(),
      password: chance.string({ length: 10 })
    }

    await api
      .post('/api/users/create')
      .send(userData)
      .expect(201)
      .expect({
        user: {
          avatar: 'userDefault.png',
          userName: userData.userName,
          email: userData.email,
          password: '649b58e164ab7d8c9061fc35',
          _id: '649b58e164ab7d8c9061fc35',
          directories: []
        }
      })
  })
})

describe('DELETE /api/users/delete', () => {
  it('should delete user by userName', async () => {
    await api
      .delete('/api/users/delete/Clara')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('"user deleted succefull"')
  })

  it.skip('should return error authorization if not token', async () => {
    await api.get('/api/users/Clara')
      .expect(203)
      .expect('Content-Type', /json/)
      .expect({ error: 'You dont have authoriaztion' })
  })
})
