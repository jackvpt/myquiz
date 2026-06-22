const multer = require("multer")
const path = require("path")
const fs = require("fs")
const slugifyFilename = require("../../utils/slugifyFilename")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const date = new Date()

    const folder = path.join(
      "uploads",
      "images",
      String(date.getFullYear()),
      String(date.getMonth() + 1).padStart(2, "0"),
    )

    fs.mkdirSync(folder, { recursive: true })

    cb(null, folder)
  },

  filename: (req, file, cb) => {
    const clean = slugifyFilename(file.originalname)

    const folder = path.join(
      "uploads",
      "images",
      String(new Date().getFullYear()),
      String(new Date().getMonth() + 1).padStart(2, "0"),
    )

    const fullPath = path.join(folder, clean)

    // File already exists -> keep same name
    if (fs.existsSync(fullPath)) {
      return cb(null, clean)
    }

    cb(null, clean)
  },
})

module.exports = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
