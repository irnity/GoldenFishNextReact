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
  address: '',
  email: '',
  status: null,
  error: null,
  password: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    changeStatus(state, payload) {
      state.status = payload.payload
    },
  },

  extraReducers: (builder) => {
    // get user information
    builder.addCase(authGetUserInformation.fulfilled, (state, payload) => {
      const {
        firstName,
        lastName,
        surname,
        email,
        phoneNumber,
        address,
        isAdmin,
        isLogedIn,
        status,
      } = payload.payload

      state.firstName = firstName
      state.lastName = lastName
      state.surname = surname
      state.phoneNumber = phoneNumber
      state.email = email
      state.address = address
      state.isLogedIn = isLogedIn
      state.isAdmin = isAdmin
      state.status = status
    })

    // login
    builder.addCase(authLogin.fulfilled, (state, actions) => {
      const {
        firstName,
        lastName,
        surname,
        email,
        phoneNumber,
        address,
        isAdmin,
        isLogedIn,
        status,
      } = actions.payload

      state.firstName = firstName
      state.lastName = lastName
      state.surname = surname
      state.phoneNumber = phoneNumber
      state.address = address
      state.email = email
      state.isLogedIn = isLogedIn
      state.isAdmin = isAdmin
      state.status = status
    })

    // registration
    builder.addCase(authRegistration.fulfilled, (state, payload) => {
      state.status = payload.payload
    })

    // restore password
    builder.addCase(authRestorePassword.fulfilled, (state, payload) => {
      state.status = 'success'
    })

    // change credentials
    builder.addCase(authChangeCredentials.fulfilled, (state, actions) => {
      const { firstName, lastName, surname, phoneNumber, address, status } =
        actions.payload

      state.firstName = firstName ?? state.firstName
      state.lastName = lastName ?? state.lastName
      state.surname = surname ?? state.surname
      state.phoneNumber = phoneNumber ?? state.phoneNumber
      state.address = address ?? state.address
      state.status = status
    })

    // create admin
    builder.addCase(authCreateAdmin.fulfilled, (state, payload) => {
      state.status = 'success'
    })

    // logout
    builder.addCase(authLogout.fulfilled, (state, actions) => {
      const {
        firstName,
        lastName,
        surname,
        email,
        phoneNumber,
        address,
        isAdmin,
        isLogedIn,
        status,
      } = actions.payload

      state.firstName = firstName
      state.lastName = lastName
      state.surname = surname
      state.phoneNumber = phoneNumber
      state.address = address
      state.email = email
      state.isLogedIn = isLogedIn
      state.isAdmin = isAdmin
      state.status = status
    })
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
