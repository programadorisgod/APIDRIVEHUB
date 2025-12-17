import sharp from 'sharp'
import path from 'node:path'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import { UNIDAD_PATH } from '../directories/paths.js'
ffmpeg.setFfmpegPath(ffmpegPath.path)

export async function getMiniature(directoryName, folder, file) {
  const fileName = file.fileName
  try {
    const originalFilePath = folder
      ? path.join(UNIDAD_PATH, `${directoryName}/${folder}`, `${fileName}`)
      : path.join(UNIDAD_PATH, `${directoryName}`, `${fileName}`)
    const miniatureFilePath = path.join(UNIDAD_PATH, `${directoryName}/gallery/`)
    const ext = fileName.split('.').pop().toLowerCase()

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
      wmv: getMiniatureVideo,
    }

    const handler = typeDoc[ext]
    if (typeof handler === 'function') {
      await handler(fileName, originalFilePath, miniatureFilePath)
    }
  } catch (error) {
    throw error
  }
}

async function getMiniatureImages(fileName, originalFilePath, miniatureFilePath) {
  return new Promise((resolve, reject) => {
    const miniaturePath = path.join(miniatureFilePath, `${fileName.split('.')[0]}.png`)
    sharp(originalFilePath)
      .resize(260, 168)
      .toFile(miniaturePath, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(miniaturePath)
      })
  })
}

async function getMiniatureVideo(fileName, originalFilePath, miniatureFilePath) {
  try {
    const nameMiniatura = fileName.split('.')[0]
    ffmpeg(originalFilePath).screenshots({
      timestamps: [0.5],
      filename: `${nameMiniatura}.png`,
      folder: miniatureFilePath,
      size: '260x168',
    })
  } catch (error) {
    console.log(error)
  }
}
