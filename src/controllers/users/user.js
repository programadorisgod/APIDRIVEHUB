import { console } from 'node:inspector/promises'
import { settings } from '../../config/env/varaibles.js'
import getMiniature from '../../helpers/files/getMiniature.js'
import { encryptPassword } from '../../helpers/handleBcrypt.js'
import { httpError } from '../../helpers/handleError.js'
import { createDirectoryStructure } from '../../middleware/directories/create-directories.js'
import { deleteFile } from '../../middleware/directories/delete-directory.js'
import { deleteFiles } from '../../middleware/directories/delete-files.js'
import UserModel from '../../models /user.js'
import { createPhysicalDir } from '../../helpers/directories/create-physical-directory.js'

/**
 * This function get a user by id specified
 * @param {id} req
 * @param {user} res
 * @returns
 */
export const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const userExist = await UserModel.findById({ _id: id })

    if (!userExist || Object.keys(userExist).length === 0) {
      res.status(404).json({ error: 'id is malformed user not found ' })
      return
    }
    const user = {
      ...userExist._doc,
      avatar: `${settings.HOST}/api/files/avatars/${userExist.avatar}`,
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
    const passwordHash = await encryptPassword(password)
    const directoryName = `Default${userName.trim().split(' ').join('')}`

    const newUser = {
      avatar,
      userName: userName.trim().split(' ').join(''),
      password: passwordHash,
      email,
      directories: [
        {
          directoryName,
          files: [],
        },
      ],
    }

    await createDirectoryStructure(directoryName)

    const userCreated = await UserModel.create(newUser)

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
    let passwordHash = user.password

    let avatar = user.avatar

    /** si se subio el archivo, accedemos a la primera pociosion del arreglo avatar y accedemos a la propiedad del nombre
     del archivo
     */

    if (req.file && req.file.filename) {
      avatar = req.file.filename
    }
    /** si viene contraseñas la actualizamos y encryptamos */
    if (password) {
      passwordHash = await encryptPassword(password)
    }

    const userUpdate = await UserModel.findByIdAndUpdate(
      id,
      { userName, password: passwordHash, avatar },
      { new: true }
    )

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
 * Creates a new directory for a user, both in the database and on the filesystem.
 *
 * This handler validates the directory name, verifies that the user exists,
 * checks if the directory name is already registered, and then attempts to
 * create the physical directory on disk. If the directory is created
 * successfully, it updates the user's directory list using `$addToSet` to
 * avoid duplicates.
 *
 * @param {object} req - Express request object. Uses `req.params.username`,
 * `req.params.baseDir`, and `req.body.directoryName`.
 * @param {object} res - Express response object used to send status codes and JSON data.
 * @param {function} _next - Unused Express middleware callback.
 *
 * @returns {void} Sends a JSON response:
 * - `400` if `directoryName` is missing.
 * - `404` if the user does not exist.
 * - `409` if a directory with the same name already exists for the user.
 * - `500` if the physical directory cannot be created.
 * - `201` with the updated directory list if the directory is created successfully.
 */
export const createFolder = async (req, res, _next) => {
  const { username, baseDir } = req.params

  const { directoryName } = req.body

  if (!directoryName || directoryName.trim() === '') {
    return res.status(400).json({ message: 'No directory name provided' })
  }

  try {
    const existingUser = await UserModel.findOne({ userName: username })

    if (!existingUser) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const directoryExists = existingUser.directories.find((dir) => dir.directoryName === directoryName)

    if (directoryExists) {
      res.status(409).json({
        error: 'The directory could not be created, because there is already one with that name',
      })
      return
    }

    const createdDirectory = await createPhysicalDir({ baseDir, directoryName })

    if (createdDirectory instanceof Error) {
      res.status(500).json({ error: 'Could not create the directory' })
      return
    }

    /** usamos el metodo addToset para agregar al arreglo y aplanarlo */
    const updateUser = await UserModel.findOneAndUpdate(
      existingUser._id,
      {
        $addToSet: {
          directories: { directoryName },
        },
      },
      { new: true }
    )

    res.status(201).json({
      message: 'Directory created successfully',
      directories: updateUser.directories,
    })
    return
  } catch (error) {
    httpError(error, res)
  }
}
/**
 * This function updates a user's directories by adding new files to a specific directory.
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {String} req.params.userName - The username of the user.
 * @param {String} req.params.directoryName - The name of the directory.
 * @param {String}res - The `res` parameter is the response object that will be sent back to the client with
 * the updated directories or an error message. It contains methods to set the HTTP status code,
 * headers, and body of the response.
 * @returns This function returns a JSON response with the updated user object if the update was
 * successful, or an error message if there was an error.
 */
export const uploadFileToDirectory = async (req, res) => {
  const { username, directory, folder } = req.params

  try {
    const file = []
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    let day = new Date().getDate().toString()

    if (day.length === 1) {
      day = `0${day}`
    }

    const date = `${year}-${month}-${day}`.toString()
    let space = 0

    const uploadedFiles = []
    /* si se cargaron archivos, entonces lo que hacemos es recorrer el array y agregar los nuevo elementos */
    if (req.files && req.files.gallery) {
      console.log('entopr')
      req.files.gallery.forEach((element) => {
        file.push({
          nameFile: element.originalname,
          Date: date,
          size: element.size,
        })
        space += element.size
      })
    }

    const userFileUpdate = await UserModel.findOneAndUpdate(
      { userName: username },
      /** agregamos los archivos aplanados y le decimos que los guarde en la direccion del directorio que encontró */
      {
        $addToSet: {
          'directories.$[dir].files': { $each: file },
        },
      },
      // le indicamos el directorio
      {
        arrayFilters: [{ 'dir.directoryName': folder }],
        new: true,
      }
    )

    if (!userFileUpdate) {
      return res.status(404).json({ error: 'User or directory not found', userFileUpdate })
    }

    userFileUpdate.space += space
    await userFileUpdate.save()

    if (!userFileUpdate) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    for (const fileName of uploadedFiles) {
      await getMiniature(directory, fileName)
    }

    res.status(200).json({ userFileUpdate })
  } catch (error) {
    console.log(error, 'error')
    httpError(error, res)
  }
}
/**
 * This function delete a directory by the name directory specified
 * @param {Object} req - The request object
 * @param {Object} req.params - The request parameters
 * @param {String} req.params.userName - The username of the user
 * @param {String} req.params.directoryName - The name of the directory
 * @param {function} next - The next middleware function in the aplicacion
 * @param {String} res - The response object whit JSON
 * @returns This function returns a JSON response whit message directory deleted correctly
 */
export const deleteDirectory = async (req, res, next) => {
  const { username, dir } = req.params

  let size = 0

  try {
    const userExist = await UserModel.findOne({ username })

    if (!userExist) {
      res.status(404).json({ error: 'User not found, id is malformed' })
      return
    }

    const directories = userExist.directories.find((dir) => dir.directoryName === dir)

    if (!directories) {
      res.status(404).json({ error: 'Directory not found, id is malformed' })
      return
    }

    size = await deleteFile(req, res)
    userExist.space -= Number(size)

    if (userExist.space < 0) {
      userExist.space = 0
    }

    await UserModel.updateOne({ username }, { $pull: { directories: { directoryName: `${dir}` } } }, { new: true })

    const user = await UserModel.findOne({ username })
    res.status(200).json({ user })

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
 * @param {String} req.params.directoryName - Tge name of the Directory
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
  const { username, dir } = req.params

  const { files } = req.body
  try {
    let totalSize = 0

    if (!Array.isArray(files) || files.length === 0) {
      res.status(400).json({ error: 'files is not array' })
      return
    }

    const user = await UserModel.findOne({ username })

    if (!user) {
      res.status(404).json({ error: 'User not found, id is malformed' })
      return
    }

    const foundDirectory = user.directories.find((dir) => dir.directoryName === dir)
    if (!foundDirectory) {
      res.status(404).json({ error: 'Directory not found, id is malformed' })
      return
    }
    const filesToDelete = foundDirectory.files.filter((file) => !files.includes(file.nameFile))

    const size = await deleteFiles(req, res)

    if (size !== Number(size)) {
      res.status(404).json({ error: 'files not found' })
      return
    }
    totalSize = Number(user.space) - Number(size)

    user.space = totalSize

    directory.files = filesToDelete

    await user.save()
    const userUpdated = await UserModel.findOne({ username })

    res.status(200).json({ userUpdated })
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
  const { username } = req.params

  try {
    const userDelete = await UserModel.findOneAndDelete({ username })

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
  const { username } = req.params

  try {
    let premium

    const user = await UserModel.findOne({ username })

    if (!user) {
      res.status(404).json({ error: 'Invalid id' })
      return
    }
    // eslint-disable-next-line prefer-const
    premium = !user.premium

    const userUpdate = await UserModel.findOneAndUpdate({ username }, { premium }, { new: true })

    if (!userUpdate) {
      res.status(500).json({ error: 'could not update the membership' })
      return
    }

    res.status(200).json({ userUpdate })
  } catch (error) {
    httpError(error, res)
  }
}
