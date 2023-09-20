import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { auth, googleProvider } from "../services/firebase/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { useRouter } from "next/router"
import { getFunctions, httpsCallable } from "firebase/functions"

interface initialAuthStateProps {
  isLogedIn: boolean
  isAdmin: boolean
  userInfo: {
    email: string | null | undefined
  }
  status: string | null
  error: string | null
}

const initialAuthState: initialAuthStateProps = {
  isLogedIn: false,
  isAdmin: false,

  userInfo: {
    email: "",
  },

  status: null,
  error: null,
}

export const authGetUserInformation = createAsyncThunk(
  "auth/email",
  async () => {
    let userState: {
      email: string | null | undefined
      isLogedIn: boolean
      isAdmin: boolean
    } = {
      email: "",
      isLogedIn: false,
      isAdmin: false,
    }

    try {
      const user: any = await new Promise((resolve) => {
        auth.onAuthStateChanged(resolve)
      })

      if (user) {
        const logedInStorage = localStorage.getItem("logedIn")
        const isUserAdministrator = localStorage.getItem("isUserAdministrator")
        const timeStorage: any = localStorage.getItem("time")

        const todayDay: any = new Date()
        const dayLogedIn: any = new Date(timeStorage)

        const timeDiffrence = Math.abs(todayDay - dayLogedIn)
        const daysOnline = Math.ceil(timeDiffrence / (1000 * 60 * 60 * 24))

        if (daysOnline >= 7) {
          userState.isLogedIn = false
          userState.isAdmin = false
          userState.email = ""
          authLogout()
        } else {
          userState.email = user.email
          userState.isLogedIn = true
          if (isUserAdministrator) {
            userState.isAdmin = true
          }
        }
        return userState
      } else {
        userState.isLogedIn = false
        userState.isAdmin = false
        userState.email = ""
        return userState
      }
    } catch (error) {
      // Handle any potential errors here
      throw error
    }
  }
)

export const authLogin = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const responce = await signInWithEmailAndPassword(auth, email, password)

      const admin = (await responce.user.getIdTokenResult()).claims

      console.log(admin)

      dispatch(authActions.logInWithPassword({ admin: admin.admin, email }))
      return "isLogedIn"
    } catch (err) {
      throw err
    }
  }
)

export const authGmail = createAsyncThunk(
  "auth/gmail",
  async (_, { dispatch }) => {
    try {
      const responce = await signInWithPopup(auth, googleProvider)

      const admin = (await responce.user.getIdTokenResult()).claims

      console.log(admin)

      dispatch(
        authActions.logInWithPassword({ admin, email: responce.user.email })
      )
      return "isLogedIn"
    } catch (err) {
      throw err
    }
  }
)

export const authRegistration = createAsyncThunk(
  "auth/registration",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const responce = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      dispatch(authActions.logInWithPassword({ admin: false, email }))
      return "isLogedIn"
    } catch (err) {
      throw err
    }
  }
)

export const authCreateAdmin = createAsyncThunk(
  "auth/createAdmin",
  async ({ email }: { email: string }) => {
    try {
      const functions = getFunctions()
      const addAdminRole = httpsCallable(functions, "addAdminRole")
      addAdminRole({ email }).then((result) => console.log(result))
    } catch (err) {
      throw err
    }
  }
)

export const authLogout = createAsyncThunk("auth/logout", async () => {
  try {
    await signOut(auth)
  } catch (err) {
    console.error(err)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logInWithPassword(state, payload) {
      localStorage.setItem("logedIn", "true")
      localStorage.setItem("time", new Date().toISOString())

      state.isLogedIn = true
      state.userInfo.email = payload.payload.email

      if (payload.payload.admin === true) {
        localStorage.setItem("isUserAdministrator", "true")
        state.isAdmin = true
      }
    },
    changeStatus(state, payload) {
      state.status = payload.payload
    },
  },

  extraReducers: {
    // authGetUserInformation
    [authGetUserInformation.fulfilled.toString()]: (state, payload) => {
      state.status = "success"
      console.log(payload.payload)
      state.userInfo.email = payload.payload.email
      state.isLogedIn = payload.payload.isLogedIn
      state.isAdmin = payload.payload.isAdmin
    },

    // login with email & password
    [authLogin.fulfilled.toString()]: (state, payload) => {
      console.log(payload.payload)
      state.status = payload.payload
    },

    // gmail
    [authGmail.fulfilled.toString()]: (state, payload) => {
      console.log(payload.payload)
      state.status = payload.payload
    },
    [authGmail.rejected.toString()]: (state, payload) => {
      console.log(payload.error.message)
      state.status = "error"
      state.isAdmin = false
      state.isLogedIn = false
      state.userInfo.email = ""
    },

    // registration
    [authRegistration.fulfilled.toString()]: (state, payload) => {
      state.status = payload.payload
    },
    [authRegistration.rejected.toString()]: (state, payload) => {
      console.log(payload.error.message)
      state.status = "error"
    },

    // create admin
    [authCreateAdmin.fulfilled.toString()]: (state, payload) => {
      state.status = payload.payload
    },
    [authCreateAdmin.rejected.toString()]: (state, payload) => {
      console.log(payload.error.message)
      state.status = "error"
    },

    // logout
    [authLogout.fulfilled.toString()]: (state) => {
      state.status = "success"

      state.isAdmin = false
      state.isLogedIn = false
      state.userInfo.email = ""

      localStorage.removeItem("isUserAdministrator")
      localStorage.removeItem("time")
      localStorage.removeItem("logedIn")
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
