import { auth } from '@/Services/Firebase/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IAuth } from '../model'
import { authLogout } from './authLogout'

export const authGetUserInformation = createAsyncThunk(
  'auth/email',
  async () => {
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

    try {
      const user: any = await new Promise((resolve) => {
        auth.onAuthStateChanged(resolve)
      })

      if (user !== undefined) {
        const timeStorage: any = localStorage.getItem('time')
        const todayDay: any = new Date()
        const dayLogedIn: any = new Date(timeStorage)
        const timeDiffrence = Math.abs(todayDay - dayLogedIn)
        const daysOnline = Math.ceil(timeDiffrence / (1000 * 60 * 60 * 24))

        if (daysOnline >= 7) {
          authLogout()
          return userState
        }

        const claims = (await user.getIdTokenResult()).claims

        const fetchUser = await fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify(auth.currentUser?.email),
        })
        const data = await fetchUser.json()

        const { firstName, lastName, surname, phoneNumber, address, email } =
          data.data

        userState = {
          ...userState,
          firstName,
          lastName,
          surname,
          phoneNumber,
          address,
          email,
          isLogedIn: true,
          status: 'success',
        }

        if (claims.admin === true) {
          userState.isAdmin = true
        }
      }

      return userState
    } catch (error) {
      // Handle any potential errors here
      console.log('error:', error)
      throw error
    }
  }
)
