import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IAuth } from '../model'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/Services/Firebase/firebase'

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

    const fetchUser = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify(email),
    })
    const data = await fetchUser.json()

    const { firstName, lastName, surname, phoneNumber, address } = data.data
    userState = {
      firstName,
      lastName,
      surname,
      phoneNumber,
      address,
      email: data.data.email,
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
