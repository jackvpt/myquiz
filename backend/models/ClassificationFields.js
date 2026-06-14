const ClassificationSchema = require("./Classification")

module.exports = {
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
}