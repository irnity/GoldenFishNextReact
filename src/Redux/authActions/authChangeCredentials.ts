import { auth, db } from '@/services/firebase/firebase'
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
    }: {
      firstName?: string
      lastName?: string
      surname?: string
    },
    { dispatch }
  ) => {
    const user = auth.currentUser
    if (user !== undefined) {
      const updateFields = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(surname && { surname }),
      }

      const email = user.email

      const docRef = doc(db, 'users', email!)

      const responce = await updateDoc(docRef, updateFields)

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
    }
  }
)
