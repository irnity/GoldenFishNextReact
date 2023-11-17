import { auth, db } from '@/Services/Firebase/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, updateDoc } from 'firebase/firestore'
import { warningActions } from '../warningSlice'

export const authChangeCredentials = createAsyncThunk(
  'auth/changeCredentia',
  async (
    {
      firstName,
      lastName,
      surname,
      email,
    }: {
      firstName?: string
      lastName?: string
      surname?: string
      email: string
    },
    { dispatch }
  ) => {
    const user = auth.currentUser
    if (user !== undefined) {
      const updateFields: {
        firstName?: string
        lastName?: string
        surname?: string
      } = {}

      if (firstName !== undefined) {
        updateFields.firstName = firstName
      }

      if (lastName !== undefined) {
        updateFields.lastName = lastName
      }

      if (surname !== undefined) {
        updateFields.surname = surname
      }

      const docRef = doc(db, 'users', email)

      await updateDoc(docRef, updateFields)

      dispatch(
        warningActions.setWarning({
          code: 200,
          message: 'Профіль успішно оновлений',
        })
      )

      return {
        firstName: updateFields.firstName,
        lastName: updateFields.lastName,
        surname: updateFields.surname,
        status: 'success',
      }
    } else {
      dispatch(
        warningActions.setWarning({
          code: 500,
          message: 'Помилка оновлення профілю',
        })
      )

      return {
        status: 'error',
      }
    }
  }
)
