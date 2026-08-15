import { createSlice } from "@reduxjs/toolkit"

export const initialState = null

const selectedAccountSlice = createSlice({
  name: "selectedAccount",
  initialState,
  reducers: {
    setSelectedAccount: (state, action) => {
      return action.payload
    },
    clearSelectedAccount: () => {
      return null
    },
  },
})

export const { setSelectedAccount, clearSelectedAccount } = selectedAccountSlice.actions
export default selectedAccountSlice.reducer
