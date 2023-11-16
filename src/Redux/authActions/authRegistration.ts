import { auth, db } from '@/services/firebase/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { warningActions } from '../warningSlice'

export const authRegistration = createAsyncThunk(
  'auth/registration',
  async (
    {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    }: {
      firstName: string
      lastName: string
      phoneNumber: string
      email: string
      password: string
    },
    { dispatch }
  ) => {
    const responce = await createUserWithEmailAndPassword(auth, email, password)

    await setDoc(doc(db, 'users', email), {
      firstName,
      lastName,
      phoneNumber,
      email,
      userId: responce.user.uid,
      createdAt: Timestamp.now(),
    })

    dispatch(
      warningActions.setWarning({
        code: 200,
        message: 'Профіль успішно створений',
      })
    )
    // dispatch(authActions.logInWithPassword({ admin: false, email }))
    localStorage.setItem('time', new Date().toISOString())
    return 'isLogedIn'
  }
)
