import getMiniature from '../../helpers/getMiniature.js'
import { encryptPassword } from '../../helpers/handleBcrypt.js'
import { httpError } from '../../helpers/handleError.js'
import { createDirectory } from '../../middleware/directories/CreateDirectories.js'
import { deleteFile } from '../../middleware/directories/DeleteDirectory.js'
import { deleteFiles } from '../../middleware/directories/DeleteFiles.js'
import UserModel from '../../models /user.js'
/**
 * This function get a user by id specified
 * @param {id} req
 * @param {user} res
 * @returns
 */
export const getUser = async (req, res) => {
  const { id } = req.params

  try {
    /** Buscamos al usuario por su nombre de usuario ya que es unico */
    const userExist = await UserModel.findById({ _id: id })

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
    httpError(error, res)
  }
}

/**
 * This function creates a new user with a default avatar, encrypted password, and specified username,
 * email, and creation date.
 * @param {body} req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param {user} res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `status` to set the HTTP status code of the response, and
 * `json` to send a JSON response back to the client.
 * @returns If the user is successfully created, a JSON object with the created user's information is
 * returned with a status code of 201. If there is an error creating the user, a JSON object with an
 * error message is returned with a status code of 500.
 */
export const createUser = async (req, res, next) => {
  const { userName, email, password } = req.body
  try {
    const avatar = 'userDefault.png'
    const passwordHas = await encryptPassword(password)
    const nameDirectory = `Default${userName}`
    const userNew = {
      avatar,
      userName,
      password: passwordHas,
      email,
      directories: [
        {
          nameDirectory,
          files: []
        }
      ]

    }

    createDirectory(nameDirectory)
    const userCreated = await UserModel.create(userNew)
    if (!userCreated) {
      res.status(500).json({ error: 'Could not create the user' })
      return
    }
    res.status(201).json({ userCreated })
    return next()
  } catch (error) {
    httpError(error, res)
  }
}
/**
 * This function updates a user's information, including their username, password, and avatar image.
 * @param {body, id}req - The request object represents the HTTP request that was sent by the client to the
 * server. It contains information about the request, such as the HTTP method, headers, body, and
 * parameters.
 * @param {user} res - The "res" parameter is the response object that will be sent back to the client with
 * the updated user information or an error message if something went wrong during the update process.
 * @returns a JSON response with the updated user object if the update was successful, or a JSON
 * response with an error message if there was an error during the update process.
 */

export const UpdateUser = async (req, res) => {
  const { userName, password } = req.body
  const { id } = req.params

  try {
    const user = await UserModel.findById(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    let passwordHas = user.password

    let avatar = user.avatar
    /** si se subio el archivo, accedemos a la primera pociosion del arreglo avatar y accedemos a la propiedad del nombre
     del archivo
     */

    if (req.file && req.file.filename) {
      avatar = req.file.filename
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
    httpError(error, res)
  }
}
/**
 * This function creates a directory for a user and checks if the directory already exists.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send the HTTP response back to the client.
 * It contains methods like `status()` to set the HTTP status code, `json()` to send a JSON response,
 * and `send()` to send a plain text response.
 * @param next - `next` is a function that is called to pass control to the next middleware function.
 * It is typically used in Express.js to chain multiple middleware functions together.
 * @returns a JSON response with the created directory object if the directory was successfully
 * created, or an error message if there was an issue with the request or server. The `next()` function
 * is also being called, but it is not necessary since the function already returns a response.
 */
export const createDirectorie = async (req, res, next) => {
  const { userName } = req.params
  const { nameDirectory } = req.body

  try {
    const user = await UserModel.findOne({ userName })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // verificar Si el directorio existe
    const verifyDirectory = user.directories.find(dir => dir.nameDirectorio === nameDirectory)
    if (verifyDirectory) {
      res.status(409).json({ error: 'No se pudo crear el directorio, porque ya existe uno con ese nombre' })
      return
    }

    /** usamos el metodo addToset para agregar al arreglo y aplanarlo */
    const userCreatedDirectory = await UserModel.findOneAndUpdate(user._id,
      { $addToSet: { directories: { nameDirectory } } },
      { new: true }
    )

    res.status(200).json(userCreatedDirectory)
    return next()
  } catch (error) {
    httpError(error, res)
  }
}
/**
 * This function updates a user's directories by adding new files to a specific directory.
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {String} req.params.userName - The username of the user.
 * @param {String} req.params.nameDirectory - The name of the directory.
 * @param {String}res - The `res` parameter is the response object that will be sent back to the client with
 * the updated directories or an error message. It contains methods to set the HTTP status code,
 * headers, and body of the response.
 * @returns This function returns a JSON response with the updated user object if the update was
 * successful, or an error message if there was an error.
 */
export const updateDirectories = async (req, res) => {
  const { userName, nameDirectory, Default } = req.params

  try {
    const file = []
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const date = `${year}-${month}-${day}`.toString()
    let space = 0

    /* si se cargaron archivos, entonces lo que hacemos es recorrer el array y agregar los nuevo elementos */
    if (req.files && req.files.gallery) {
      req.files.gallery.forEach(element => {
        file.push({ nameFile: element.originalname, Date: date, size: element.size })
        space += element.size
        getMiniature(nameDirectory, Default, element.originalname)
      })
    }

    const userFileUpdate = await UserModel.findOneAndUpdate(
      { userName },
      /** agregamos los archivos aplanados y le decimos que los guarde en la direccion del directorio que encontró */
      {
        $addToSet: {
          'directories.$[dir].files': { $each: file }
        }

      },
      // le indicamos el directorio
      {
        arrayFilters: [{ 'dir.nameDirectory': nameDirectory }],
        new: true
      },
      // devolvemos al usuario actualizado
      { new: true }
    )

    userFileUpdate.space += space
    await userFileUpdate.save()

    if (!userFileUpdate) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.status(200).json({ userFileUpdate })
  } catch (error) {
    console.log(error)
    httpError(error, res)
  }
}
/**
 * This function delete a directory by the name directory specified
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {String} req.params.userName - The username of the user
 * @param {String} req.params.nameDirectory - The name of the directory
 * @param {function} next - The next middleware function in the aplicacion
 * @param {String} res - The response object whit JSON
 * @returns This function returns a JSON response whit message directory deleted correctly
 */
export const deleteDirectory = async (req, res, next) => {
  const { userName, nameDirectory } = req.params
  let size = 0
  try {
    const userExist = await UserModel.findOne({ userName })
    if (!userExist) {
      res.status(404).json({ error: 'User not found, id is malformed' })
      return
    }

    const directories = userExist.directories.find(dir => dir.nameDirectory === nameDirectory)

    if (!directories) {
      res.status(404).json({ error: 'Directory not found, id is malformed' })
      return
    }

    await UserModel.updateOne({ userName }, { $pull: { directories: { nameDirectory: `${nameDirectory}` } } }, { new: true })
    size = await deleteFile(req, res)
    if (userExist.space !== 0) {
      userExist.space -= size
    }
    await userExist.save()
    res.status(200).json({ message: 'Directory deleted correctly ' })
    return next()
  } catch (error) {
    httpError(error, res)
  }
}

/**
 * This function deletes files from a user's directory based on the provided file names.
 * @param {Object} req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param {Object} req.params - The request params
 * @param {Object} req.body - The request body
 * @param {String} req.params.userName - Tge username of the User
 * @param {String} req.params.nameDirectory - Tge name of the Directory
 * @param {Array} req.body - The array whit name of files to delete
 * @param res - The `res` parameter is the response object that will be sent back to the client with
 * the result of the HTTP request. It contains methods to set the status code, headers, and body of the
 * response.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next operation after
 * completing the current one.
 * @returns  the result of calling the `next()` function, which is typically used to pass control to the
 * next middleware function in the stack.
 */
export const deleteFileUser = async (req, res, next) => {
  const { userName, nameDirectory } = req.params

  const { files } = req.body
  try {
    let totalSize = 0

    if (!Array.isArray(files) || files.length === 0) {
      res.status(400).json({ error: 'files is not array' })
      return
    }

    const user = await UserModel.findOne({ userName })
    if (!user) {
      res.status(404).json({ error: 'User not found, id is malformed' })
      return
    }

    const directory = user.directories.find(dir => dir.nameDirectory === nameDirectory)
    if (!directory) {
      res.status(404).json({ error: 'Directory not found, id is malformed' })
      return
    }
    const filesToDelete = directory.files.filter((file) => !files.includes(file.nameFile))

    const size = await deleteFiles(req, res)

    if (size !== Number(size)) {
      res.status(404).json({ error: 'files not found' })
      return
    }
    totalSize = Number(user.space) - Number(size)

    if (user.space > 0) {
      user.space = totalSize
    }

    directory.files = filesToDelete

    await user.save()

    res.status(200).json({ message: 'files deleted correctly' })
  } catch (error) {
    console.log(error)
    httpError(error, res)
  }
}

/**
 * this function delete a user by username specified
 * @param {username} req
 * @param {userdelete} res
 * @returns This function returns a JSON whit user deleted
 */
export const deleteUser = async (req, res) => {
  const { userName } = req.params

  try {
    const userDelete = await UserModel.findOneAndDelete({ userName })

    if (!userDelete) {
      res.status(500).json({ error: 'could not delete the user ' })
      return
    }
    res.status(200).json('user deleted succefull')
  } catch (error) {
    httpError(error, res)
  }
}

export const updateMember = async (req, res) => {
  const { userName } = req.params
  try {
    let premium
    const user = await UserModel.findOne({ userName })

    if (!user) {
      res.status(404).json({ error: 'Invalid id' })
      return
    }
    // eslint-disable-next-line prefer-const
    premium = !user.premium

    const userUpdatemembership = await UserModel.findOneAndUpdate({ userName }, { premium }, { new: true })
    if (!userUpdatemembership) {
      res.status(500).json({ error: 'could not update the membership' })
      return
    }

    res.status(200).json({ userUpdatemembership })
  } catch (error) {
    httpError(error, res)
  }
}
