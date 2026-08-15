// features/didYouKnowSlice.js
import { createSlice } from "@reduxjs/toolkit"

const emptyDidYouKnow = {
  theme: "",
  domain: "",
  section: "",
  family: "",
  category: "",
  topic: "",
  referenceId: "",
  documentationRef: "",
  contentIllustrationFile: null,
  contentIllustrationPreview: null,
  text: "",
  difficulty: "easy",
  answerImageFiles: [],
  answerImagePreviews: [],
  order: 1,
  removeContentIllustration: false,
  removedAnswerImageUrls: [],
}

// features/didYouKnowSlice.js
const didYouKnowSlice = createSlice({
  name: "didYouKnow",
  initialState: { edited: null },
  reducers: {
    setEdited: (state, action) => {
      state.edited = action.payload
    },
    startNewDidYouKnow: (state) => {
      state.edited = emptyDidYouKnow
    },
    updateEdited: (state, action) => {
      if (state.edited) {
        Object.assign(state.edited, action.payload)
      }
    },
    resetEdited: (state) => {
      state.edited = null
    },
  },
})

export const { setEdited, startNewDidYouKnow, updateEdited, resetEdited } = didYouKnowSlice.actions
export const selectEditedDidYouKnow = (state) => state.didYouKnow.edited
export default didYouKnowSlice.reducer