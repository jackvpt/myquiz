module.exports = {

  documentationRef: {
    type: String,
    trim: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },

  tags: {
    type: [String],
    default: [],
  },

  contentIllustration: {
    type: String,
    trim: true,
  },

  questionImageUrls: {
    type: [String],
    default: [],
  },

}