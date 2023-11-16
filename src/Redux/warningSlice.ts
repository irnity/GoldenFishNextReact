import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialWarningState: {
  code: number
  message: string
} = {
  code: 0,
  message: '',
}

const warningSlice = createSlice({
  name: 'warning',
  initialState: initialWarningState,
  reducers: {
    setWarning(
      state,
      action: PayloadAction<{
        code: number
        message: string
      }>
    ) {
      state.code = action.payload.code
      state.message = action.payload.message
    },
    clearWarning(state) {
      state.code = 0
      state.message = ''
    },
  },
})

export const warningActions = warningSlice.actions

export default warningSlice.reducer
