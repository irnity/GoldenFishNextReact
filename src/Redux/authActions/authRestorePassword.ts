import { createAsyncThunk } from '@reduxjs/toolkit'
import { sendPasswordResetEmail } from 'firebase/auth'
import { warningActions } from '../warningSlice'
import { auth } from '@/services/firebase/firebase'

export const authRestorePassword = createAsyncThunk(
  'auth/restorePassword',
  async ({ email }: { email: string }, { dispatch }) => {
    await sendPasswordResetEmail(auth, email)
    dispatch(
      warningActions.setWarning({
        code: 200,
        message: 'Лист для відновлення паролю відправлено',
      })
    )
  }
)
