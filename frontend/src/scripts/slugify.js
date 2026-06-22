export const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD")               // Split an accented letter in the base letter and the accent
    .replace(/[\u0300-\u036f]/g, "") // Delete accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")            // Spaces → -
    .replace(/[^\w-]+/g, "")         // Delete all non-word chars
    .replace(/--+/g, "-")            // double -
}