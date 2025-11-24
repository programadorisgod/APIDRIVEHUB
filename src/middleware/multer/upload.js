import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { UNIDAD_PATH } from '../../helpers/directories/paths.js'
const __dirname = fileURLToPath(import.meta.url)

/* This code is configuring the storage engine to be used by the multer middleware for handling file
uploads. It specifies the destination directory where uploaded files will be stored and the filename
that will be used for each uploaded file. The `destination` function takes the `req`, `file`, and
`cb` (callback) parameters and sets the destination directory based on the `nameDirectory` parameter
in the request URL. The `filename` function takes the `req`, `file`, and `cb` parameters and sets
the filename to be the original name of the uploaded file. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { directory, folder } = req.params

    const route =
      directory && folder ? path.join(UNIDAD_PATH, `${directory}/${folder}`) : path.join(UNIDAD_PATH, `${directory}`)
    console.log(route, 'ROUTE')
    cb(null, route)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

function fixEncoding(str) {
  // Si contiene �, es señal de mal UTF-8
  if (str.includes('�')) {
    return Buffer.from(str, 'binary').toString('utf-8')
  }
  return str
}

function checkFileType(req, file, cb) {
  let name = file.originalname

  // 1. Reparar UTF-8 corrupto
  name = fixEncoding(name)

  name = name.normalize('NFC')

  // 3. Sanitizar caracteres ilegales
  name = name.replace(/[\/\\\<\>\:\*\?\"\|]/g, '_')

  file.originalname = name
  cb(null, true)
}

/* This code is defining a middleware function called `uploadFile` that uses the `multer` library to
handle file uploads. The `multer` middleware is configured with a `storage` object that specifies
the destination directory and filename for uploaded files. The `fields` method is used to specify
that the middleware should expect a file with the name `gallery`. */

const upload = multer({ storage, fileFilter: checkFileType }).fields([{ name: 'gallery' }])

export const uploadFile = (req, res, next) => {
  upload(req, res, (error) => {
    console.log('FILES RECIBIDOS:', req.files)

    if (error) {
      console.log('erro')
      res.status(400).json({ error: error.message })
      return
    }
    return next()
  })
}
