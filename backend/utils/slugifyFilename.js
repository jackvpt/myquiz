const slugifyFilename = (filename) => {
  const extension = filename.split(".").pop()

  const name = filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .normalize("NFD") // split accents
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return `${name}.${extension.toLowerCase()}`
}

module.exports = slugifyFilename