// Scripts
import { slugify } from "../scripts/slugify"

export default class DidYouKnowModel {
  constructor(data = {}) {
    // Mongo
    this.id = data._id || data.id || null

    // -----------------------------
    // Classification (STRING in form)
    // Backend returns objects { name, slug, type } -> extract `name`
    // -----------------------------
    this.theme = data.theme?.name || ""
    this.domain = data.domain?.name || ""
    this.section = data.section?.name || ""
    this.family = data.family?.name || ""
    this.category = data.category?.name || ""
    this.topic = data.topic?.name || ""

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

    // -----------------------------
    // Removal flags (frontend only)
    // -----------------------------
    this.removeContentIllustration = data.removeContentIllustration || false
    this.removedAnswerImageUrls = data.removedAnswerImageUrls || []

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
    // NOTE: JSON.stringify(null) -> "null" (a string). The Express controller must
    // JSON.parse() this and check for === null before assigning it to the Mongo
    // document, otherwise Mongoose will receive the literal string "null" instead
    // of the actual null value.
    formData.append("theme", JSON.stringify(this.formatClassification(this.theme, "theme")))
    formData.append("domain", JSON.stringify(this.formatClassification(this.domain, "domain")))
    formData.append("section", JSON.stringify(this.formatClassification(this.section, "section")))
    formData.append("family", JSON.stringify(this.formatClassification(this.family, "family")))
    formData.append("category", JSON.stringify(this.formatClassification(this.category, "category")))
    formData.append("topic", JSON.stringify(this.formatClassification(this.topic, "topic")))

    // Text data
    formData.append("text", this.text.trim())
    formData.append("referenceId", this.referenceId.trim())
    formData.append("documentationRef", this.documentationRef.trim())
    formData.append("difficulty", this.difficulty)
    formData.append("order", this.order)
    formData.append("tags", JSON.stringify(this.tags))

    // Illustration image
    if (this.contentIllustrationFile instanceof File) {
      formData.append("contentIllustration", this.contentIllustrationFile)
    } else if (this.removeContentIllustration) {
      formData.append("removeContentIllustration", "true")
    }

    // Answer images — new files
    this.answerImageFiles.forEach((file) => {
      if (file instanceof File) {
        formData.append("answerImages", file)
      }
    })

    // Answer images — explicit removals
    if (this.removedAnswerImageUrls.length > 0) {
      formData.append("removedAnswerImageUrls", JSON.stringify(this.removedAnswerImageUrls))
    }

    return formData
  }

  toEditableState() {
    return {
      id: this.id,
      theme: this.theme,
      domain: this.domain,
      section: this.section,
      family: this.family,
      category: this.category,
      topic: this.topic,
      referenceId: this.referenceId,
      documentationRef: this.documentationRef,
      text: this.text,
      difficulty: this.difficulty,
      order: this.order,
      tags: this.tags,
      contentIllustrationFile: null,
      contentIllustrationPreview: this.contentIllustrationUrl,
      answerImageFiles: [],
      answerImagePreviews: this.answerImageUrls,
      removeContentIllustration: false,
      removedAnswerImageUrls: [],
    }
  }
}