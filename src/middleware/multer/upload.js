import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(import.meta.url)
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const { nameDirectorio } = req.params

    const route = path.join(__dirname, `../../../../unidad/${nameDirectorio}`)
    cb(null, route)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage }).fields([{ name: 'gallery' }])

export const uploadFile = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    return next()
  })
}
