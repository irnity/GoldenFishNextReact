import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IAuth } from '../model'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/Services/Firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const authLogin = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    let userState: IAuth = {
      firstName: '',
      lastName: '',
      surname: '',
      phoneNumber: '',
      address: '',
      email: '',
      isLogedIn: false,
      isAdmin: false,
      status: '',
      error: null,
      password: '',
    }

    const responce = await signInWithEmailAndPassword(auth, email, password)
    const claims = (await responce.user.getIdTokenResult()).claims

    const docRef = doc(db, 'users', email)

    const docSnap = await getDoc(docRef)

    const userInfo = docSnap.data()

    const { firstName, lastName, surname, phoneNumber, address } = userInfo as {
      firstName: string
      lastName: string
      surname: string
      phoneNumber: string
      address: string
    }

    userState = {
      firstName,
      lastName,
      surname,
      phoneNumber,
      address,
      email: userInfo.email,
      isLogedIn: true,
      isAdmin: claims.admin,
      status: 'isLogedIn',
      error: null,
      password: '',
    }
    localStorage.setItem('time', new Date().toISOString())

    return userState
  }
)
