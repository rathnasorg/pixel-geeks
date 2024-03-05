const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const inputDir = './setup/input'
const rawDir = './public/photos/raw/'

const optimizedDir = './public/photos/optimized'
const optimizedWidth = 1920

const thumbnailsDir = './public/photos/thumbnails'
const thumbnailWidth = 250

const albumTsFile = './src/album/album.ts'
const coverTsFile = './src/album/cover.ts'

const processedFilesInfo = []

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err)
    return
  }
  const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file))
  imageFiles.forEach(async (file, index) => {
    const inputPath = path.join(inputDir, file)
    const optimizedPath = path.join(optimizedDir, file)
    const thumbnailPath = path.join(thumbnailsDir, file)
    const rawPath = path.join(rawDir, file)
    const optimizedQuality = 5//findOptimizedQuality(inputPath, optimizedFileSize)

    await sharp(inputPath).resize(optimizedWidth).toFile(optimizedPath)
      .then(() => { console.log(`Optimized ${file} with quality: ${optimizedQuality} and saved to ${optimizedPath}`) })
      .catch(err => { console.error(`Error processing ${file}:`, err) })

    await sharp(inputPath).resize(thumbnailWidth).toFile(thumbnailPath)
      .then(() => { console.log(`Thumbnail generated for ${file} and saved to ${thumbnailPath}`) })
      .catch(err => { console.error(`Error generating thumbnail for ${file}:`, err) })

    await fs.rename(inputPath, rawPath, err => {
      if (err) {
        console.error(`Error moving file ${file}:`, err)
      } else {
        console.log(`File ${file} moved to ${rawDir}`)
      }
    })
    console.log(`Done with ${file}\n\n\n`)
  })

  let tIndex = 0
  for (const file of imageFiles) {
    processedFilesInfo.push({
      id: ++tIndex,
      url: `photos/optimized/${file}`,
      title: `Photo ${tIndex}`,
      thumbnailUrl: `photos/thumbnails/${file}`,
      description: `Description for photo ${file}`
    })
  }

  if (processedFilesInfo.length > 0) {
    const albumTsContent = `
/* eslint-disable */
export const album = ${JSON.stringify(processedFilesInfo)}
`
    fs.writeFile(albumTsFile, albumTsContent, err => {
      if (err) {
        console.error('Error writing album.ts:', err)
      } else {
        console.log('album.ts written successfully')
      }
    })
    const coverTsContent = `
/* eslint-disable */
export const cover = ${JSON.stringify({ ...processedFilesInfo[0], title: 'pixel-geeks', description: 'To modify, edit src/album/cover.ts' })}
`
    fs.writeFile(coverTsFile, coverTsContent, err => {
      if (err) {
        console.error('Error writing cover.ts:', err)
      } else {
        console.log('cover.ts written successfully')
      }
    })
  }
})
