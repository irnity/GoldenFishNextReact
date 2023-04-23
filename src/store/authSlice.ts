import { createSlice } from "@reduxjs/toolkit"

import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"

const initialAuthState: {
  isLogedIn: boolean
  isAdmin: boolean
  userInfo: {
    email: string | null | undefined
  }
} = {
  isLogedIn: false,
  isAdmin: false,
  userInfo: {
    email: "",
  },
}

const authSlice = createSlice({
  name: "Auth",
  initialState: initialAuthState,
  reducers: {
    // check if localstorage data is valid
    isLogedInCheck(state) {
      const logedInStorage = localStorage.getItem("logedIn")
      const isUserAdministrator = localStorage.getItem("isUserAdministrator")
      const timeStorage = localStorage.getItem("time")

      if (timeStorage) {
        const now: any = new Date()
        const saved: any = new Date(timeStorage)

        const diffTime = Math.abs(now - saved)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays >= 7 && logedInStorage === "true") {
          state.isLogedIn = false
          localStorage.removeItem("isUserAdministrator")
          localStorage.removeItem("myDate")
          localStorage.removeItem("logedIn")

          logout()
        } else {
          state.isLogedIn = true
          if (isUserAdministrator) {
            state.isAdmin = true
          }
        }
      }
    },

    // info about user get from auth custom hook
    userInfoChange(state, payload) {
      state.userInfo.email = payload.payload
    },

    // login
    logInWithPassword(state, payload) {
      state.isLogedIn = true
      localStorage.setItem("logedIn", "true")
      localStorage.setItem("time", new Date().toISOString())
      console.log(payload.payload.admin)
      if (payload.payload.admin === true) {
        localStorage.setItem("isUserAdministrator", "true")
        state.isAdmin = true
      }
    },

    // logout
    logOut(state) {
      state.isLogedIn = false
      state.isAdmin = false
      localStorage.removeItem("logedIn")
      localStorage.removeItem("time")
      localStorage.removeItem("isUserAdministrator")

      logout()
    },
  },
})

const logout = async () => {
  try {
    await signOut(auth)
  } catch (err) {
    console.error(err)
  }
}

export const authActions = authSlice.actions

export default authSlice.reducer
