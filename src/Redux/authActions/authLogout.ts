import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IAuth } from '../model'
import { auth } from '@/Services/Firebase/firebase'
import { signOut } from 'firebase/auth'

export const authLogout = createAsyncThunk('auth/logout', async () => {
  const userState: IAuth = {
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

  await signOut(auth)

  localStorage.removeItem('time')

  userState.status = 'isLogedOut'

  return userState
})
