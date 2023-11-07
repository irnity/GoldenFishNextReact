import { createAsyncThunk } from "@reduxjs/toolkit"
import { getFunctions, httpsCallable } from "firebase/functions"

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
