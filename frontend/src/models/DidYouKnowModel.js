export default class DidYouKnowModel {
  constructor(data = {}) {
    // Mongo
    this.id = data._id || data.id || null

    // Classification
    this.theme = data.theme || ""
    this.domain = data.domain || ""
    this.section = data.section || ""
    this.family = data.family || ""
    this.category = data.category || ""
    this.topic = data.topic || ""

    // References
    this.referenceId = data.referenceId || ""
    this.documentationRef = data.documentationRef || ""

    // Did you know
    this.text = data.text || ""

    // Order
    this.order = data.order || 1

    // Difficulty
    this.difficulty = data.difficulty || "easy"

    // Tags
    this.tags = data.tags || []

    // Content illustration
    this.contentIllustrationUrl = data.contentIllustrationUrl || ""

    // Answer images
    this.answerImageUrls = data.answerImageUrls || []

    // Stats
    this.stats = {
      views: data.stats?.views || 0,
      attempts: data.stats?.attempts || 0,
      successRate: data.stats?.successRate || 0,
    }

    // Dates
    this.createdAt = data.createdAt || null

    this.updatedAt = data.updatedAt || null
  }

  // Validate question
  isValid() {
    return this.text.trim() !== ""
  }

  // Convert model for API payload
  toPayload() {
    return {
      theme: this.theme,

      domain: this.domain,

      section: this.section,

      family: this.family,

      category: this.category,

      topic: this.topic,

      referenceId: this.referenceId.trim(),

      documentationRef: this.documentationRef.trim(),

      text: this.text,

      difficulty: this.difficulty,

      tags: this.tags,

      contentIllustrationUrl: this.contentIllustrationUrl,

      answerImageUrls: this.answerImageUrls,
    }
  }

  // Get breadcrumb
  getBreadcrumb() {
    return [
      this.theme?.name,
      this.domain?.name,
      this.section?.name,
      this.family?.name,
      this.category?.name,
      this.topic?.name,
    ].filter(Boolean)
  }
}
