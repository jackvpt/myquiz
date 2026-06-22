// Scripts
import { slugify } from "../scripts/slugify"

export default class DidYouKnowModel {
  constructor(data = {}) {
    // Mongo
    this.id = data._id || data.id || null

    // -----------------------------
    // Classification (STRING in form)
    // -----------------------------
    this.theme = data.theme || ""
    this.domain = data.domain || ""
    this.section = data.section || ""
    this.family = data.family || ""
    this.category = data.category || ""
    this.topic = data.topic || ""

    // -----------------------------
    // Content
    // -----------------------------
    this.text = data.text || ""

    this.referenceId = data.referenceId || ""

    this.documentationRef = data.documentationRef || ""

    // -----------------------------
    // Metadata
    // -----------------------------
    this.order = data.order ?? 1

    this.difficulty = data.difficulty || "easy"

    this.tags = data.tags || []

    // -----------------------------
    // Images URLs (from backend)
    // -----------------------------
    this.contentIllustrationUrl = data.contentIllustrationUrl || ""

    this.answerImageUrls = data.answerImageUrls || []

    // -----------------------------
    // Files (frontend only)
    // -----------------------------
    this.contentIllustrationFile = data.contentIllustrationFile || null

    this.answerImageFiles = data.answerImageFiles || []

    // Dates
    this.createdAt = data.createdAt || null
    this.updatedAt = data.updatedAt || null
  }

  // -----------------------------
  // Validation
  // -----------------------------
  isValid() {
    return this.theme.trim() !== "" && this.text.trim() !== ""
  }

  // -----------------------------
  // Convert string to backend object
  // -----------------------------
  formatClassification(value, type) {
    if (!value) return null

    return {
      name: value.trim(),
      slug: slugify(value),
      type,
    }
  }

  // -----------------------------
  // Build multipart/form-data
  // -----------------------------
  toFormData() {
    const formData = new FormData()

    // Classification objects
    formData.append(
      "theme",
      JSON.stringify(this.formatClassification(this.theme, "theme")),
    )

    formData.append(
      "domain",
      JSON.stringify(this.formatClassification(this.domain, "domain")),
    )

    formData.append(
      "section",
      JSON.stringify(this.formatClassification(this.section, "section")),
    )

    formData.append(
      "family",
      JSON.stringify(this.formatClassification(this.family, "family")),
    )

    formData.append(
      "category",
      JSON.stringify(this.formatClassification(this.category, "category")),
    )

    formData.append(
      "topic",
      JSON.stringify(this.formatClassification(this.topic, "topic")),
    )

    // Text data
    formData.append("text", this.text.trim())
    formData.append("referenceId", this.referenceId.trim())
    formData.append("documentationRef", this.documentationRef.trim())
    formData.append("difficulty", this.difficulty)
    formData.append("order", this.order)

    // Illustration image
    if (this.contentIllustrationFile instanceof File) {
      formData.append("contentIllustration", this.contentIllustrationFile)
    }

    // Answer images
    this.answerImageFiles.forEach((file) => {
      if (file instanceof File) {
        formData.append("answerImages", file)
      }
    })

    return formData
  }
}
