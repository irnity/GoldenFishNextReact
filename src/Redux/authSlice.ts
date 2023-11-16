import { createSlice } from '@reduxjs/toolkit'

import { type IAuth } from './model'

import { authGetUserInformation } from './authActions/authGetUserInformation'
import { authLogin } from './authActions/authLogin'
import { authRegistration } from './authActions/authRegistration'
import { authRestorePassword } from './authActions/authRestorePassword'
import { authChangeCredentials } from './authActions/authChangeCredentials'
import { authCreateAdmin } from './authActions/authCreateAdmin'
import { authLogout } from './authActions/authLogout'

const initialAuthState: IAuth = {
  isLogedIn: false,
  isAdmin: false,
  firstName: '',
  lastName: '',
  surname: '',
  phoneNumber: '',
  email: '',
  status: null,
  error: null,
  password: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    // logInWithPassword(state, payload) {
    //   localStorage.setItem("time", new Date().toISOString())
    //   state.isLogedIn = true
    //   state.userInfo.email = payload.payload.email
    //   if (payload.payload.admin === true) {
    //     state.isAdmin = true
    //   }
    // },
    changeStatus(state, payload) {
      state.status = payload.payload
    },
  },

  extraReducers: {
    // authGetUserInformation
    [authGetUserInformation.fulfilled.toString()]: (state, payload) => {
      console.log(payload.payload)
      const {
        firstName,
        lastName,
        surname,
        email,
        phoneNumber,
        isAdmin,
        isLogedIn,
        status,
      } = payload.payload

      state.firstName = firstName
      state.lastName = lastName
      state.surname = surname
      state.phoneNumber = phoneNumber
      state.email = email
      state.isLogedIn = isLogedIn
      state.isAdmin = isAdmin
      state.status = status
    },

    // login with email & password
    [authLogin.fulfilled.toString()]: (state, payload) => {
      const {
        firstName,
        lastName,
        surname,
        email,
        phoneNumber,
        isAdmin,
        isLogedIn,
        status,
      } = payload.payload

      state.firstName = firstName
      state.lastName = lastName
      state.surname = surname
      state.phoneNumber = phoneNumber
      state.email = email
      state.isLogedIn = isLogedIn
      state.isAdmin = isAdmin
      state.status = status
    },

    // registration
    [authRegistration.fulfilled.toString()]: (state, payload) => {
      state.status = payload.payload
    },

    // restore password
    [authRestorePassword.fulfilled.toString()]: (state, payload) => {
      state.status = payload.payload
    },

    // change credentials
    [authChangeCredentials.fulfilled.toString()]: (state, payload) => {
      const { firstName, lastName, surname, phoneNumber, status } =
        payload.payload

      state.firstName = firstName === undefined ? state.firstName : firstName
      state.lastName = lastName === undefined ? state.lastName : lastName
      state.surname = surname === undefined ? state.surname : surname
      state.phoneNumber =
        phoneNumber === undefined ? state.phoneNumber : phoneNumber

      state.status = status
    },

    // create admin
    [authCreateAdmin.fulfilled.toString()]: (state, payload) => {
      state.status = payload.payload
    },

    // logout
    [authLogout.fulfilled.toString()]: (state, payload) => {
      const {
        firstName,
        lastName,
        surname,
        email,
        phoneNumber,
        isAdmin,
        isLogedIn,
        status,
      } = payload.payload

      state.firstName = firstName
      state.lastName = lastName
      state.surname = surname
      state.phoneNumber = phoneNumber
      state.email = email
      state.isLogedIn = isLogedIn
      state.isAdmin = isAdmin
      state.status = status
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
