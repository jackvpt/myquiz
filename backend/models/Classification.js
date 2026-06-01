const mongoose = require("mongoose")

/** Create a mongoose Schema */
const ClassificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["theme", "domain", "section", "family", "category", "topic"],
      required: true,
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  { _id: false },
)

module.exports = ClassificationSchema
