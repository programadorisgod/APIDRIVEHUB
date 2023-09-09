import getFiles from '../../controllers/files/getFilesNormal.js'
import getFilesPremiun from '../../controllers/files/getFliesPremiun.js'
import UserModel from '../../models /user.js'
// Debemos diferenciar los usuarios premium de los usuarios normales y asi aplicar la velocidad de descarga

// correspondiente a cada uno de ellos
export const checkPremiun = async (req, res, next) => {
  console.log('req.params', req.params)
  const { userName } = req.params
  const user = await UserModel.findOne({ userName })
  if (user.premiun) {
    getFilesPremiun(req, res)
  } else {
    getFiles(req, res)
  }
  next()
}
