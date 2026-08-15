import { createSlice } from "@reduxjs/toolkit"

export const initialState = null

const searchAccountSlice = createSlice({
  name: "searchAccount",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      return action.payload
    },
    resetSearch: () => {
      return initialState
    },
  },
})

export const { setSearch, resetSearch } = searchAccountSlice.actions
export default searchAccountSlice.reducer
