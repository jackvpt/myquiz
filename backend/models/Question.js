/** Import mongoose */
const mongoose = require("mongoose")
const ClassificationSchema = require("./Classification")
const AnswerSchema = require("./Answer")
const DidYouKnowSchema = require("./DidYouKnow")

/** Create a mongoose Schema */
const QuestionSchema = new mongoose.Schema(
  {
    // Theme = Aviation, Finance, History, etc.
    theme: {
      type: ClassificationSchema,
      required: false,
    },

    // Domain = Aircraft, Meteorology, etc.
    domain: {
      type: ClassificationSchema,
      required: false,
    },

    // Section = H160, EC175, etc.
    section: {
      type: ClassificationSchema,
      required: false,
    },

    // Family = Technical knowledge, Operations Manual, etc.
    family: {
      type: ClassificationSchema,
      required: false,
    },

    // Category = Electrical, Hydraulics, etc.
    category: {
      type: ClassificationSchema,
      required: false,
    },

    // Topic = extra category if needed
    topic: {
      type: ClassificationSchema,
      required: false,
    },

    // ID = H160_TECH_ELEC_001
    referenceId: {
      type: String,
      required: false,
      trim: true,
    },

    // Document or reference from which the question is derived (FLM VOL 2 > DESC > ELEC > MAIN COMPNTS > 2)
    documentationRef: {
      type: String,
      trim: true,
    },
    
    openBook: {
      type: Boolean,
      default: false,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true,
      default: 1,
    },

    type: {
      type: String,
      enum: ["multiple-choice", "open"],
      default: "multiple-choice",
    },

    answers: {
      type: [AnswerSchema],

      validate: {
        validator: function (value) {
          if (this.type === "multiple-choice") {
            return value && value.length > 0
          }

          return true
        },

        message: "Multiple-choice questions must contain at least one answer.",
      },
    },

    explanation: {
      type: String,
      trim: true,
    },

    didYouKnow: {
      type: [DidYouKnowSchema],
      default: [],
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

    questionImageUrls: {
      type: [String],
      default: [],
    },

    answerImageUrls: {
      type: [String],
      default: [],
    },

    stats: {
      views: {
        type: Number,
        default: 0,
      },

      attempts: {
        type: Number,
        default: 0,
      },

      successRate: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "Question",
  QuestionSchema,
) /** 'Question' is the collection name which becomes 'Questions' */
