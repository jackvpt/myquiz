const ClassificationSchema = require("./Classification")

module.exports = {
  theme: {
    type: ClassificationSchema,
    required: false,
  },

  domain: {
    type: ClassificationSchema,
    required: false,
  },

  section: {
    type: ClassificationSchema,
    required: false,
  },

  family: {
    type: ClassificationSchema,
    required: false,
  },

  category: {
    type: ClassificationSchema,
    required: false,
  },

  topic: {
    type: ClassificationSchema,
    required: false,
  },
}