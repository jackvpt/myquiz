export default class QuestionModel {
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

    // Open book
    this.openBook = data.openBook || false
    
    // Question
    this.question = data.question || ""

    // Order
    this.order = data.order || 1

    // Question type
    this.type = data.type || "multiple-choice"

    this.openBook = data.openBook || false

    // Answers
    this.answers = data.answers || []

    // Explanation
    this.explanation = data.explanation || ""

    // Did you know
    this.didYouKnow = data.didYouKnow || []

    // Difficulty
    this.difficulty = data.difficulty || "easy"

    // Tags
    this.tags = data.tags || []

    // Images
    this.questionImageUrls = data.questionImageUrls || []

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
    return this.question.text.trim() !== ""
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

      question: {
        text: this.question.text.trim(),

        order: this.question.order,
      },

      type: this.type,

      openBook: this.openBook,

      answers: this.answers,

      explanation: this.explanation.trim(),

      didYouKnow: this.didYouKnow,

      difficulty: this.difficulty,

      tags: this.tags,

      questionImageUrls: this.questionImageUrls,

      answerImageUrls: this.answerImageUrls,
    }
  }

  // Check if multiple choice
  isMultipleChoice() {
    return this.type === "multiple-choice"
  }

  // Check if open question
  isOpenQuestion() {
    return this.type === "open"
  }

  // Count correct answers
  getCorrectAnswers() {
    return this.answers.filter((answer) => answer.isCorrect)
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
