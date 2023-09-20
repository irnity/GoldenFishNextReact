import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { auth, db } from "../services/firebase/firebase"
import {
  authActions,
  authCreateAdmin,
  authGmail,
  authLogin,
  authLogout,
  authRegistration,
} from "../redux/authSlice"

import { getFunctions, httpsCallable } from "firebase/functions"
import { useRouter } from "next/router"
import { AnyAction } from "@reduxjs/toolkit"
import { ThunkDispatch } from "redux-thunk"
import { ROUTER_TYPE } from "next/dist/build/utils"

const useAuth = () => {
  const { status } = useSelector((state: any) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()

  const router = useRouter()

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    if (status === "isLogedIn") {
      router.push("/")
    }
    dispatch(authActions.changeStatus(""))
  }, [status])

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(authLogin({ email, password }))
  }

  const loginWithGoogleHandler = async () => {
    await dispatch(authGmail())
  }

  const registrationHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    dispatch(authRegistration({ email, password }))
  }

  const createAdmin = async () => {
    dispatch(authCreateAdmin({ email }))
  }

  const logout = () => {
    dispatch(authLogout())
  }

  return {
    email,
    password,
    emailHandler,
    passwordHandler,

    loginHandler,
    loginWithGoogleHandler,
    registrationHandler,
    createAdmin,
    logout,
  }
}

export default useAuth
