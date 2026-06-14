const mongoose = require("mongoose")
const ClassificationFields = require("./ClassificationFields")
const CommonFields = require("./CommonFields")
const AnswerSchema = require("./Answer")

const QuestionSchema = new mongoose.Schema({
  ...ClassificationFields,

  ...CommonFields,

  referenceId: {
    type: String,
    trim: true,
  },

  question: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    enum: ["multiple-choice", "open"],
    default: "multiple-choice",
  },

  answers: {
    type: [AnswerSchema],
  },

  explanation: String,

  answerImageUrls: {
    type: [String],
    default: [],
  },
})
