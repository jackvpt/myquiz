const mongoose = require("mongoose")

const ClassificationFields = require("./ClassificationFields")
const CommonFields = require("./CommonFields")

const DidYouKnowSchema = new mongoose.Schema({
  ...ClassificationFields,

  ...CommonFields,

  content: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("DidYouKnow", DidYouKnowSchema)
