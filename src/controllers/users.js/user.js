import { encryptPassword } from '../../helpers/handleBcrypt.js'

import UserModel from '../../models /user.js'

export const getUser = async (req, res) => {
  const { userName } = req.params

  try {
    /** Buscamos al usuario por su nombre de usuario ya que es unico */
    const userExist = await UserModel.findOne({ userName })

    if (!userExist || Object.keys(userExist).length === 0) {
      res.status(404).json({ error: 'id is malformed user not found ' })
      return
    }
    /** reemplazamos el avatar con el host y la ruta */
    const user = {
      ...userExist._doc,
      avatar: `${process.env.HOST}/api/files/avatars/${userExist.avatar}`
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body
  try {
    const avatar = 'userDefaul.png'
    const passwordHas = await encryptPassword(password)
    const userNew = {
      avatar,
      userName,
      password: passwordHas,
      email,
      date: new Date()
    }

    const userCreated = await UserModel.create(userNew)
    if (!userCreated) {
      res.status(500).json({ error: 'Could not create the user' })
      return
    }
    res.status(201).json({ userCreated })
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
export const UpdateUser = async (req, res) => {
  const { userName, password } = req.body
  const { id } = req.params

  try {
    const user = await UserModel.findById(id)

    let passwordHas = user.password

    let avatar = user.avatar
    /** si se subio el archivo, accedemos a la primera pociosion del arreglo avatar y accedemos a la propiedad del nombre
     del archivo
     */

    if (req.files && req.files.filename) {
      avatar = req.files.filename
    }
    /** si viene contraseñas la actualizamos y encryptamos */
    if (password) {
      passwordHas = await encryptPassword(password)
    }

    const userUpdate = await UserModel.findByIdAndUpdate(id, { userName, password: passwordHas, avatar }, { new: true })

    if (!userUpdate) {
      res.status(500).json({ error: 'no se pudo actualziar ' })
      return
    }

    res.status(200).json({ userUpdate })
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
export const createDirectorie = async (req, res, next) => {
  const { userName } = req.params
  const { nameDirectorio } = req.body

  try {
    const user = await UserModel.findOne({ userName })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // verificar Si el directorio existe
    const verifyDirectory = user.directories.find(dir => dir.nameDirectorio === nameDirectorio)
    if (verifyDirectory) {
      res.status(409).json('No se pudo crear el directorio, porque ya existe uno con ese nombre')
      return
    }

    /** usamos el metodo addToset para agregar al arreglo y aplanarlo */
    const userCreatedDirectory = await UserModel.findOneAndUpdate(user._id,
      { $addToSet: { directories: { nameDirectorio } } },
      { new: true }
    )

    res.status(200).json(userCreatedDirectory)
    return next()
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
export const updateDirectories = async (req, res) => {
  const { userName } = req.params
  const { nameDirectorio } = req.params
  try {
    const file = []
    /* si se cargaron archivos, entonces lo que hacemos es recorrer el array y agregar los nuevo elementos */
    if (req.files && req.files.gallery) {
      req.files.gallery.forEach(element => {
        file.push(element.originalname)
      })
    }
    const userFileUpdate = await UserModel.findOneAndUpdate(
      userName,
      /** agregamos los archivos aplanados y le decimos que los guarde en la direccion del directorio que encontró */
      { $addToSet: { 'directories.$[dir].file': { $each: file } } },
      // le indicamos el directorio
      { arrayFilters: [{ 'dir.nameDirectorio': nameDirectorio }] },
      // devolvemos el actuali.directorieszado
      { new: true }
    )
    if (!userFileUpdate) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    // si se encontro el usuario
    res.status(200).json({ userFileUpdate })
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
export const delteUser = async (req, res) => {
  const { userName } = req.params

  try {
    const userDelete = await UserModel.findOneAndDelete({ userName })

    if (!userDelete) {
      res.status(500).json({ error: 'could not delete the user ' })
      return
    }
    res.status(200).json('user deleted succefull')
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
