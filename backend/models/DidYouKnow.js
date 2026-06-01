const mongoose = require("mongoose")

/** Create a mongoose Schema */
const DidYouKnowSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    _id: false,
  },
)
