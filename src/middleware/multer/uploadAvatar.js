import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(import.meta.url)
const route = path.join(__dirname, '../../../../uploads/')
console.log(route)
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, route)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
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
