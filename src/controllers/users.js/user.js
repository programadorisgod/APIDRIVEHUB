import { encryptPassword } from '../../helpers/handleBcrypt.js'

import UserModel from '../../models /user.js'

export const getUser = async (req, res) => {
  const { userName } = req.params

  try {
    const userExist = await UserModel.findOne({ userName })

    if (!userExist || Object.keys(userExist).length === 0) {
      res.status(404).json({ error: 'id is malformed user not found ' })
      return
    }
    const user = {
      ...userExist._doc,
      avatar: `${process.env.HOST}/api/avatars/${userExist.avatar}`
    }
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}

export const createUser = async (req, res) => {
  const { userName, email, password, directories } = req.body
  try {
    let avatar = 'userDefaul.png'
    if (req.file && req.file.filename) {
      avatar = req.file.filename
    }

    const passwordHas = await encryptPassword(password)

    const userNew = {
      avatar,
      userName,
      password: passwordHas,
      email,
      directories,
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
    console.log(user.password)

    let passwordHas = user.password

    let avatar = user.avatar

    if (req.file && req.file.filename) {
      avatar = req.file.filename
    }

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
export const delteUser = async (req, res) => {
  const { userName } = req.params

  try {
    const userDelete = await UserModel.findOneAndDelete({ userName })
    console.log(userDelete, 'xd')

    if (!userDelete) {
      res.status(500).json({ error: 'could not delete the user ' })
      return
    }
    res.status(200).json('user deleted succefull')
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
