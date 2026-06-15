const mongoose = require("mongoose")
const ClassificationFields = require("./ClassificationFields")
const CommonFields = require("./CommonFields")
const AnswerSchema = require("./Answer")

const QuestionSchema = new mongoose.Schema({
  ...ClassificationFields,

  ...CommonFields,

  // The actual question text
  question: {
    type: String,
    required: true,
    trim: true,
  },

  // Type of question (multiple-choice or open-ended)
  type: {
    type: String,
    enum: ["multiple-choice", "open"],
    default: "multiple-choice",
  },

  // Array of possible answers for multiple-choice questions
  answers: {
    type: [AnswerSchema],
  },

  // Explanation or rationale for the correct answer
  explanation: {
    type: String,
    trim: true,
  },

  // Illustration or image associated to the answer
  answerImageUrls: {
    type: [String],
    default: [],
  },
})

module.exports = mongoose.model("Question", QuestionSchema)/** 'Question' is the collection name which becomes 'Questions' */
