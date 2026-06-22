const { toPublicPath } = require("../../utils/filePath")

/**
 * Convert multer files into URLs
 */
exports.buildSingleImageUrl = (file, baseUrl) => {
  if (!file) return ""
  return `${baseUrl}/${toPublicPath(file.path)}`
}

/**
 * Convert multiple files into URLs
 */
exports.buildMultipleImageUrls = (files, baseUrl) => {
  return (files || []).map(
    (file) => `${baseUrl}/${toPublicPath(file.path)}`
  )
}