import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath.path)

const __dirname = fileURLToPath(import.meta.url)
export default async function getMiniature (nameDirectory, Default, nameFile) {
  try {
    const routeOriginal = path.join(__dirname, `../../../unidad/${nameDirectory}`, `${nameFile}`)
    const routeMiniature = path.join(__dirname, `../../../unidad/${Default}/gallery/`)
    const ext = nameFile.split('.').pop().toLowerCase()

    const typeDoc = {
      jpeg: getMiniatureImages,
      jpg: getMiniatureImages,
      png: getMiniatureImages,
      gif: getMiniatureImages,
      webp: getMiniatureImages,
      svg: getMiniatureImages,

      mp4: getMiniatureVideo,
      avi: getMiniatureVideo,
      mkv: getMiniatureVideo,
      webM: getMiniatureVideo,
      flv: getMiniatureVideo,
      wmv: getMiniatureVideo

    }

    const handler = typeDoc[ext]
    if (typeof handler === 'function') {
      await handler(nameFile, routeOriginal, routeMiniature)
    }
  } catch (error) {
    console.log(error)
  }
}

async function getMiniatureImages (nameFile, routeOriginal, routeMiniature) {
  try {
    const miniaturePath = path.join(routeMiniature, `${nameFile.split('.')[0]}.png`)
    await sharp(routeOriginal)
      .resize(260, 168)
      .toFile(miniaturePath, (err) => {
        if (err) throw err
      })
  } catch (error) {
    console.log(error)
  }
}

async function getMiniatureVideo (nameFile, routeOriginal, routeMiniature) {
  try {
    const nameMiniatura = nameFile.split('.')[0]

    ffmpeg(routeOriginal)
      .screenshots({
        timestamps: [0.5],
        filename: `${nameMiniatura}.png`,
        folder: routeMiniature,
        size: '260x168'
      })
  } catch (error) {
    console.log(error)
  }
}
