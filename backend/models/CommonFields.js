module.exports = {
  // ID = H160_TECH_ELEC_001
  referenceId: {
    type: String,
    trim: true,
  },

  // Document or reference from which the question is derived (FLM VOL 2 > DESC > ELEC > MAIN COMPNTS > 2)
  documentationRef: {
    type: String,
    trim: true,
  },

  // Difficulty level of the question (easy, medium, hard)
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },

  // Tags for categorization and searchability
  tags: {
    type: [String],
    default: [],
  },

  // Illustration or image required by the question content
  contentIllustration: {
    type: String,
    trim: true,
  },

  // Illustration or image associated to the question
  questionImageUrls: {
    type: [String],
    default: [],
  },

  // Illustration or image associated to the answer
  answerImageUrls: {
    type: [String],
    default: [],
  },
}
