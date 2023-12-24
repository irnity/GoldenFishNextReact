import { auth, db } from '@/Services/Firebase/firebase'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type IAuth } from '../model'
import { authLogout } from './authLogout'
import { doc, getDoc } from 'firebase/firestore'

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

      console.log(user.email)

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

        const docRef = doc(db, 'users', user.email)

        const docSnap = await getDoc(docRef)

        const userInfo = docSnap.data()

        const { firstName, lastName, surname, phoneNumber, address, email } =
          userInfo

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
