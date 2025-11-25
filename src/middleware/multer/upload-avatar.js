import multer from 'multer'
import { UPLOADS_PATH } from '../../helpers/directories/paths.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage }).single('avatar')

export const uploadAvatar = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    return next()
  })
}
